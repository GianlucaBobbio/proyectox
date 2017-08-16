angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout,$http) {})

.controller('PlaylistsCtrl', function($scope,serviceModule,$filter,$http,$timeout,$state,$ionicModal,$rootScope,$ionicLoading) {
	
	$scope.openPieChart = function () {
		$state.go('app.PieChart');
		
    }
	$scope.openDonut = function () {
		
		$state.go('app.Donut');
		
    }
	$scope.OpenAreaChart = function () {
		// $state.go('app.Stores');
		$state.go('app.AreaChart');
		
    }
})

.controller('PieChartCtrl', function($scope,serviceModule, $stateParams,$timeout,$rootScope,$ionicScrollDelegate) {
	 serviceModule.onloadingshow();
	$timeout( function() {
			serviceModule.onloadinghide();
	},1400);
	
	 $scope.chartPie = {
      options: {
        chart: {
          type: 'pie',
          // marginTop: '10px'
        },
        colors: ['#00FF80', '#D7DF01', '#5882FA', '#FF4000'],

      },
      series: [{
        data: [
          ['Apple', 100],
          ['Banan', 300],
          ['Orange', 200],
          ['Mango', 400]
        ],
        name: 'Fruit Quantity',
        //data:[50,40],
        dataLabels: {
          rotation: 270,
          enabled: false,
          format: '<b>{point.name}</b>: {point.percentage:.1f}'
        }
      }],
      title: {
        text: 'Pie Chart'
      },
       tooltip: {
            valueDecimals: 2,
            valueSuffix: ' USD'
        },

      credits: {
        enabled: false
      },

      loading: false
    }



}).controller('DonutCtrl', function($scope,serviceModule, $timeout,$stateParams,$rootScope,$ionicScrollDelegate) {
	serviceModule.onloadingshow();
	$timeout( function() {
			serviceModule.onloadinghide();
	},1400);
	
	  $scope.chartDonut = {
      options: {
         plotOptions: {

                pie: {              
                    
                    dataLabels: {
                        enabled: false,
                      
                        style: {
                            fontWeight: 'bold',
                            color: 'white',
                            textShadow: '0px 1px 2px black',

                        }

                    },
                    startAngle: -90,
                    endAngle: 90,
                    center: ['50%', '75%']
                }
            },
             colors: ['#00FF80', '#D7DF01', '#5882FA', '#FF4000'],
        
    },

      
    
      series: [{
        type: 'pie',
        innerSize: '50%',
       data: [
          ['Apple', 200],
          ['Banan', 100],
          ['Orange', 300],
          ['Mango', 100]
        ],
        name: 'Fruit Quantity',
        //data:[50,40],
        dataLabels: {
          rotation: 270,
          enabled: false,
          format: '<b>{point.name}</b>: {point.percentage:.1f} '

        }
      }],
       title: {
            text: '',
            align: 'center',
            verticalAlign: 'middle',
            y: -60
        },
      

      credits: {
        enabled: false
      },

      loading: false
    }
}).controller('AreaChartCtrl', function($scope, serviceModule,$timeout,$stateParams,$rootScope,$state,$ionicScrollDelegate) {
	serviceModule.onloadingshow();
	$timeout( function() {
			serviceModule.onloadinghide();
	},1400);
	
	
$scope.chartarea = {
  options: {
          chart: {
            type: 'area',
            inverted: false,
            zoomType: 'xy',
             
             height: 250,
             
           

          },
          plotOptions: {
            
          series: {
              cursor: 'pointer',
              column :{
               size: '30%',
              },
              
          }
        },
          colors: ['#058dc7', '#A5DF00']
        },

        xAxis: {
           
            
            categories: ['01 Oct','02 Oct','03 Oct','04 Oct','05 Oct','06 Oct','07 Oct',],
            title: {
                text: ''
            },
            labels: {
                rotation: -90,
                style: {
                    fontSize: '12px',
            }
            }

        },
        yAxis: {
            min: 0,
            title: {
                text: 'Bandthwidth (MB)',
                align: 'high'
            },
            labels: {
                overflow: 'justify'
            }
        },
        tooltip: {
            valueSuffix: ' '
        },
        
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            
            floating: false,
            borderWidth: 1,
            backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
            shadow: true
        },
        credits: {
            enabled: false
        },
        title: {
               text: 'Internet Usage',
               style: {
                //color: '#FF00FF',
                fontSize: '12px'
            },
        },

        series: [{
            name: 'Download',
            data: [50,60,70,50,60,70],
        }, {
            name: 'Upload',
            data: [40,30,60,50,60,70],
        }, ],
        loading : false

    }
	
});
