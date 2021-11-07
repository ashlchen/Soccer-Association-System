const AssignmentApp = {
    data() {
      return {
        selectedAssignmentEdit: null,
        gameAssignment: [],
        assignmentForm: {},
        selectedAssignment: null,
        referee: [],
        selectedReferee: null,
        selectedRefereeEdit: null
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
        selectAssignmentEdit(a) {
            if (a == this.selectedAssignmentEdit) {
                return;
            }
            this.selectedAssignmentEdit = a;
            this.assignmentForm = [];
            this.fetchAssignmentData();
        },
        selectRefereeDetail(r) {
          if (r == this.selectedReferee) {
              return;
          }
          this.selectedReferee = r;
          this.gameAssignment = [];
          this.fetchGameAssignmentData(this.selectedReferee);
      },
      selectRefereeEdit(r) {
          if (r == this.selectedRefereeEdit) {
              return;
          }
          this.selectedRefereeEdit = r;
          this.refereeForm = r;
      },
      fetchRefereeData() {
          fetch('../api/referee/')
          .then( response => response.json() )
          .then( (responseJson) => {
              console.log(responseJson);
              this.referee = responseJson;
          })
          .catch( (err) => {
              console.error(err);
          })
      },
        fetchAssignmentData() {
          fetch('../api/GameAssignment/')
          .then( response => response.json() )
          .then( (responseJson) => {
              console.log(responseJson);
              this.gameAssignment = responseJson;
          })
          .catch( (err) => {
              console.error(err);
          })
      },
        postAssignment(evt) {
            if (this.selectedAssignment === null) {
                this.postNewAssignment(evt);
            } else {
                this.postEditAssignment(evt);
            }
          },
        postNewAssignment(evt) {
        //   this.refereeForm.RefereeID = this.selectedReferee.RefereeID;        
          console.log("Posting:", this.assignmentForm);
          // alert("Posting!");
  
          fetch('../api/GameAssignment/create.php', {
              method:'POST',
              body: JSON.stringify(this.assignmentForm),
              headers: {
                "Content-Type": "application/json; charset=utf-8",
                'Accept': 'application/json'
              }
            })
            .then( response => response.json() )
            .then( json => {
              console.log("Returned from post:", json);
              // TODO: test a result was returned!
              this.gameAssignment = json;
              
              // reset the form
              this.assignmentForm = {};
            });
        },
        postEditAssignment(evt) {
            this.assignmentForm.AssignmentID = this.selectedAssignment.RefereeID;
            this.assignmentForm.AssignmentID = this.selectedAssignment.id;       
            
            console.log("Updating!", this.assignmentForm);
    
            fetch('../api/GameAssignment/update.php', {
                method:'POST',
                body: JSON.stringify(this.assignmentForm),
                headers: {
                  "Content-Type": "application/json; charset=utf-8"
                }
              })
              .then( response => response.json() )
              .then( json => {
                console.log("Returned from post:", json);
                // TODO: test a result was returned!
                this.gameAssignment = json;
                
                this.resetAssignmentForm();
              });
          },
        postDeleteAssignment(a) {
            if (!confirm("Are you sure you want to delete the assignment ?")) {
                return;
            }
            
            fetch('../api/GameAssignment/delete.php', {
                method:'POST',
                body: JSON.stringify(a),
                headers: {
                  "Content-Type": "application/json; charset=utf-8"
                }
              })
              .then( response => response.json() )
              .then( json => {
                console.log("Returned from post:", json);
                // TODO: test a result was returned!
                this.gameAssignment = json;
                
                this.resetAssignmentForm();
              });
          },
        resetAssignmentForm() {
            this.selectedAssignment = null;
            this.assignmentForm = {};
          }
      
    },
    created() {
        this.fetchAssignmentData();
        this.fetchRefereeData();
    }
  
  }
  
  Vue.createApp(AssignmentApp).mount('#AssignmentApp');