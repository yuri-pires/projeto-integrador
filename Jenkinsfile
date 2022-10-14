pipeline {
  agent any

  stages{
    stage('Verify Docker version'){
      steps {
        bat 'docker version'
        bat 'docker compose version'
        bat 'curl --version'
      }
    }

    stage('Up Grafana/Influx Service'){
      steps {
        bat 'docker-compose -f docker-compose.yml up -d influxdb grafana'
      }
    }

    stage('Runing load tests...'){
      steps {
        bat 'docker-compose -f docker-compose.yml run k6 run /env/tests/Inserir-Conta.js'
      }
    }
  }

  post {
    always {
      bat 'docker compose down --remove-orphans -v'
      bat 'docker compose ps'
    }
  }

}