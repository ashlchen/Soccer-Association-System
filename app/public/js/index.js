const SomeApp = {
    data() {
      return {
        referee: [],
        selectedReferee: null,
        gameAssignment: [],
        game: [],
        refereeForm: {}
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
            this.refereeForm = [];
            this.gameAssignment = [];
            this.fetchRefereeData();
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
        fetchGameData() {
            fetch('/api/Game/')
            .then( response => response.json() )
            .then( (responseJson) => {
                console.log(responseJson);
                this.game = responseJson;
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
        postReferee(evt) {
            if (this.selectedReferee === null) {
                this.postNewReferee(evt);
            } else {
                this.postEditReferee(evt);
            }
          },
        postNewReferee(evt) {
          this.refereeForm.RefereeID = this.selectedReferee.RefereeID;        
          console.log("Posting:", this.refereeForm);
          // alert("Posting!");
  
          fetch('api/referee/create.php', {
              method:'POST',
              body: JSON.stringify(this.refereeForm),
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
              this.refereeForm = {};
            });
        },
        postEditReferee(evt) {
            this.refereeForm.RefereeID = this.selectedReferee.RefereeID;
            this.refereeForm.id = this.selectedReferee.id;       
            
            console.log("Updating!", this.refereeForm);
    
            fetch('api/referee/update.php', {
                method:'POST',
                body: JSON.stringify(this.refereeForm),
                headers: {
                  "Content-Type": "application/json; charset=utf-8"
                }
              })
              .then( response => response.json() )
              .then( json => {
                console.log("Returned from post:", json);
                // TODO: test a result was returned!
                this.offers = json;
                
                this.resetRefereeForm();
              });
          },
        postDeleteReferee(r) {
            if (!confirm("Are you sure you want to delete the referee "+r.RefereeFirst+"?")) {
                return;
            }
            
            fetch('api/referee/delete.php', {
                method:'POST',
                body: JSON.stringify(r),
                headers: {
                  "Content-Type": "application/json; charset=utf-8"
                }
              })
              .then( response => response.json() )
              .then( json => {
                console.log("Returned from post:", json);
                // TODO: test a result was returned!
                this.offers = json;
                
                this.resetRefereeForm();
              });
          },
        resetRefereeForm() {
            this.selectedReferee = null;
            this.refereeForm = {};
          }
      
    },
    created() {
        this.fetchRefereeData();
    }
  
  }
  
  Vue.createApp(SomeApp).mount('#offerApp');