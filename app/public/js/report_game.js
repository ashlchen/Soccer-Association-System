const reportgameApp = {
    data() {
      return {
        game: []
      }
    },
    computed: {},
    methods: {
        fetchGameData() {
            fetch('/api/report/game.php')
            .then( response => response.json() )
            .then( (responseJson) => {
                console.log(responseJson);
                this.game = responseJson;
            })
            .catch( (error) => {
                console.error(error);
            });
        }
    },
    created() {
        this.fetchGameData();
    }
  }
  
  Vue.createApp(reportgameApp).mount('#reportgameApp');