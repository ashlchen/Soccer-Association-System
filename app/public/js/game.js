const GameApp = {
    data() {
      return {
        referee: [],
        selectedReferee: null,
        selectedGameEdit: null,
        gameAssignment: [],
        game: [],
        refereeForm: {},
        gameForm: {},
        selectedGame: null,
        selectedGameDetail: null
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
        selectGameDetail(g) {
            if (g == this.selectedGame) {
                return;
            }
            this.selectedGame = g;
            this.gameAssignment = [];
            this.fetchGameAssignmentData(this.selectedGame);
        },
        selectGameEdit(g) {
            if (g == this.selectedGameEdit) {
                return;
            }
            this.selectedGameEdit = g;
            this.gameForm = g;
        },
        // fetchRefereeData() {
        //     fetch('../api/referee/')
        //     .then( response => response.json() )
        //     .then( (responseJson) => {
        //         console.log(responseJson);
        //         this.referee = responseJson;
        //     })
        //     .catch( (err) => {
        //         console.error(err);
        //     })
        // },
        fetchGameData() {
            fetch('../api/Game/')
            .then( response => response.json() )
            .then( (responseJson) => {
                console.log(responseJson);
                this.game = responseJson;
            })
            .catch( (err) => {
                console.error(err);
            })
        },
        fetchGameAssignmentData(g) {
            console.log("Fetching assignment data for ", g);
            fetch('../api/GameAssignment/detailassignment.php?GameID=' + g.GameID)
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
        postGame(evt) {
            if (this.selectedGame === null) {
                this.postNewGame(evt);
            } else {
                this.postEditGame(evt);
            }
          },
        postNewGame(evt) {
        //   this.refereeForm.RefereeID = this.selectedReferee.RefereeID;        
          console.log("Posting:", this.gameForm);
          // alert("Posting!");
  
          fetch('../api/Game/create.php', {
              method:'POST',
              body: JSON.stringify(this.gameForm),
              headers: {
                "Content-Type": "application/json; charset=utf-8",
                'Accept': 'application/json'
              }
            })
            .then( response => response.json() )
            .then( json => {
              console.log("Returned from post:", json);
              // TODO: test a result was returned!
              this.game = json;
              
              // reset the form
              this.gameForm = {};
            });
        },
        postEditGame(evt) {
            this.gameForm.GameID = this.selectedGame.GameID; 
            
            console.log("Updating!", this.gameForm);
    
            fetch('../api/Game/update.php', {
                method:'POST',
                body: JSON.stringify(this.gameForm),
                headers: {
                  "Content-Type": "application/json; charset=utf-8"
                }
              })
              .then( response => response.json() )
              .then( json => {
                console.log("Returned from post:", json);
                // TODO: test a result was returned!
                this.game = json;
                
                this.resetGameForm();
              });
          },
        postDeleteGame(g) {
            if (!confirm("Are you sure you want to delete the game "+g.Field+"?")) {
                return;
            }
            
            fetch('../api/Game/delete.php', {
                method:'POST',
                body: JSON.stringify(g),
                headers: {
                  "Content-Type": "application/json; charset=utf-8"
                }
              })
              .then( response => response.json() )
              .then( json => {
                console.log("Returned from post:", json);
                // TODO: test a result was returned!
                this.game = json;
                
                this.resetGameForm();
              });
          },
        resetGameForm() {
            this.selectedGame = null;
            this.gameForm = {};
            this.selectedGameEdit = null;
          }
      
    },
    created() {
        this.fetchGameData();
    }
  
  }
  
  Vue.createApp(GameApp).mount('#GameApp');