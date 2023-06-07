const ctx = document.getElementById("chart").getContext("2d");
let chart;
let chartType = "line"; // 초기에는 라인 차트로 시작

function SetTitle(group, id){
    const titleElement = document.getElementById("chart-title");
    if (group === "task") {
        titleElement.textContent = `Task ${id}의 Core별 수행 능력`;
    } else if (group === "core") {
        titleElement.textContent = `Core ${id}의 Task별 수행 능력`;
    }
}

function loadData(group, id) {
  var elementChart = document.getElementById("chart");
  elementChart.style.visibility = "visible";
  fetch(`/data/${group}/${id}`)
      .then((response) => {
          if (!response.ok) {
              throw new Error("응답 데이터를 받아오는 도중 오류가 발생했습니다.");
          }
          return response.json();
      })
      .then((data) => {
          if (chart) {
              chart.destroy();
          }

          let datasets = [];
          let labels = ['최소값', '최대값', '평균값'];
          if (chartType === "doughnut" || chartType === "polarArea") {
              datasets = data.map((item) => {
                  return {
                      label: item.label, // 각각의 Task 이름
                      data: [item.min, item.max, item.avg],
                      backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(75, 192, 192, 0.2)", "rgba(255, 206, 86, 0.2)"],
                      borderColor: ["rgba(255, 99, 132, 1)", "rgba(75, 192, 192, 1)", "rgba(255, 206, 86, 1)"],
                      borderWidth: 1,
                  };
              });
              chart = new Chart(ctx, {
                type: chartType,
                data: {
                    labels: labels,
                    datasets: datasets
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                        },
                    },
                    tooltips: {
                        callbacks: {
                            title: function(tooltipItem, data) {
                                return data.datasets[tooltipItem[0].datasetIndex].label + "의 " + data.labels[tooltipItem[0].index];
                            },
                            label: function(tooltipItem, data) {
                                return "값: " + data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                            }
                        }
                    }
                },
            });
          } else {
            chart = new Chart(ctx, {
                type: chartType,
                data: {
                  labels: data.map((item) => item.label),
                  datasets: [
                    {
                      label: "최소값",
                      data: data.map((item) => item.min),
                      backgroundColor: "rgba(255, 99, 132, 0.2)",
                      borderColor: "rgba(255, 99, 132, 1)",
                      borderWidth: 1,
                    },
                    {
                      label: "최대값",
                      data: data.map((item) => item.max),
                      backgroundColor: "rgba(75, 192, 192, 0.2)",
                      borderColor: "rgba(75, 192, 192, 1)",
                      borderWidth: 1,
                    },
                    {
                      label: "평균값",
                      data: data.map((item) => item.avg),
                      backgroundColor: "rgba(255, 206, 86, 0.2)",
                      borderColor: "rgba(255, 206, 86, 1)",
                      borderWidth: 1,
                    },
                  ],
                },
                options: {
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: true,
                    },
                  },
                },
              });
          }
      })
      .catch((error) => {
          console.error("오류로 인하여 작업을 실행하지 못했습니다.", error);
      });
}

function toggleChartType(event) {
    const selectedChartType = event.target.dataset.chartType;
    if (selectedChartType !== chartType) {
        chartType = selectedChartType;
        if (chart) {
            chart.destroy();
        }
        chart = new Chart(ctx, {
            type: chartType,
            data: {
                labels: [],
                datasets: [],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
            },
        });
        loadData("data_group", "data_id");

        var elementChart = document.getElementById("chart");
        elementChart.style.visibility = "hidden";
    }
}

loadData("data_group", "data_id"); // 초기 데이터 로드

// 7개의 차트 버튼
const chartButtons = document.querySelectorAll(".chart-button");
chartButtons.forEach((button) => {
    button.addEventListener("click", toggleChartType);
});