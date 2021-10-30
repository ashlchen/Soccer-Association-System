const SomeApp = {
    data() {
      return {
        referee: [],
        selectedReferee: null,
        gameAssignment: [],
        // offerForm: {}
      }
    },
    computed: {},
    methods: {
        prettyData(d) {
            return dayjs(d)
            .format('D MMM YYYY')
        },
        prettyDollar(n) {
            const d = new Intl.NumberFormat("en-US").format(n);
            return "$ " + d;
        },
        selectReferee(r) {
            if (r == this.selectedReferee) {
                return;
            }
            this.selectedReferee = r;
            this.gameAssignment = [];
            this.fetchGameAssignmentData(this.selectedReferee);
        },
        fetchRefereeData() {
            fetch('/api/referee/')
            .then( response => response.json() )
            .then( (responseJson) => {
                console.log(responseJson);
                this.referee = responseJson;
            })
            .catch( (err) => {
                console.error(err);
            })
        },
        fetchGameAssignmentData(r) {
            console.log("Fetching assignment data for ", r);
            fetch('/api/GameAssignment/?RefereeID=' + r.RefereeID)
            .then( response => response.json() )
            .then( (responseJson) => {
                console.log(responseJson);
                this.gameAssignment = responseJson;
            })
            .catch( (err) => {
                console.error(err);
            })
            .catch( (error) => {
                console.error(error);
            });
        },
        postNewOffer(evt) {
          this.offerForm.studentId = this.selectedStudent.id;        
          console.log("Posting:", this.offerForm);
          // alert("Posting!");
  
          fetch('api/offer/create.php', {
              method:'POST',
              body: JSON.stringify(this.offerForm),
              headers: {
                "Content-Type": "application/json; charset=utf-8"
              }
            })
            .then( response => response.json() )
            .then( json => {
              console.log("Returned from post:", json);
              // TODO: test a result was returned!
              this.offers = json;
              
              // reset the form
              this.offerForm = {};
            });
        }
    },
    created() {
        this.fetchRefereeData();
    }
  
  }
  
  Vue.createApp(SomeApp).mount('#offerApp');