const reportApp = {
    data() {
      return {
        gameAssignment: []
      }
    },
    computed: {},
    methods: {
        prettyData(d) {
            return dayjs(d)
            .format('D MMM YYYY')
        },
        fetchAssignmentData() {
            fetch('/api/report/referee.php')
            .then( response => response.json() )
            .then( (responseJson) => {
                console.log(responseJson);
                this.gameAssignment = responseJson;
            })
            .catch( (error) => {
                console.error(error);
            });
        }
    },
    created() {
        this.fetchAssignmentData();
    }
  }
  
  Vue.createApp(reportApp).mount('#reportApp');