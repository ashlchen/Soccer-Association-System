const reports = {
    data() {
      return {
        selectedRefereeDetails: null,
        dateReportForm: {},
        assignDetail: {},
        referee: {}
       }
    },
    
    methods:{
        selectReferee() {
            this.selectedRefereeDetails= this.dateReportForm;
            fetch('/api/report/index.php', {
              method:'POST',
              body: JSON.stringify(this.dateReportForm),
              headers: {
                "Content-Type": "application/json; charset=utf-8"
              }
            })
            .then( response => response.json() )
            .then( (responseJson) => {
                console.log(responseJson);
                this.assignDetail = responseJson;
            })
            .catch( (err) => {
                console.error(err);
            })
        },
        fetchRefereeData() {
            fetch('/api/referee/index.php')
            .then( response => response.json() )
            .then( (responseJson) => {
                console.log(responseJson);
                this.referee = responseJson;
            })
            .catch( (err) => {
                console.error(err);
            })
        }
    },

    created(){
      this.fetchRefereeData();
    }
  }

  Vue.createApp(reports).mount('#ReportApp');

  
  function downloadCSV(csv, filename) {
    var csvFile;
    var downloadLink;

    // CSV file
    csvFile = new Blob([csv], {type: "text/csv"});

    // Download link
    downloadLink = document.createElement("a");

    // File name
    downloadLink.download = filename;

    // Create a link to the file
    downloadLink.href = window.URL.createObjectURL(csvFile);

    // Hide download link
    downloadLink.style.display = "none";

    // Add the link to DOM
    document.body.appendChild(downloadLink);

    // Click download link
    downloadLink.click();
}

function exportTableToCSV(filename) {
  var csv = [];
  var rows = document.querySelectorAll("table tr");
  
  for (var i = 0; i < rows.length; i++) {
      var row = [], cols = rows[i].querySelectorAll("td, th");
      
      for (var j = 0; j < cols.length; j++) 
          row.push(cols[j].innerText);
      
      csv.push(row.join(","));        
  }

  // Download CSV file
  downloadCSV(csv.join("\n"), filename);
}