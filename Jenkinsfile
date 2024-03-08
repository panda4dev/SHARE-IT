piprline{

    agent{
        docker{image: 'node: 16-alpine'}
    }
    stages{
        stage('Checkout code from github'){

            steps{
                git  branch: 'main' , url:'https://github.com/panda4dev/SHARE-IT.git'

                sh 'echo chceckout done'
            }
        }


        stage('Install Dependencies') {
            steps{
                script{
                    
                    sh 'cd server && npm install'

                    sh 'echo dependecies installed successfully for backend'

                    sh 'cd ./client && npm install '

                    sh ' echo dependecies installed for front end successfully'
                    
                }

                
            }
        }


        stage('Build and Package Application'){
            steps{
                script{
                    sh ' cd ./server && npm run build'

                    sh 'echo build completed for backend'

                    sh ' cd ./client && npm run build'
                }
                script{

                }
            }
        }

        stage('Build Docker Image') {
            steps{

                sh 'docker build . -t SHARE-IT-Image'
                // method 2 
                // dockerfile Pipeline 'Dockerfile'
            }
        }

        stage("Push to Docker Hub"){
            steps{
                withCredentials([usernamePassword(credentialsId:"dockerHub",passwordVariable:"dockerHubPass",usernameVariable:"dockerHubUser")]){
                    sh 'docker tag SHARE-IT-Image ${env.dockerHubUser}/SHARE-IT-Image:latest'
                    sh 'docker login -u ${env.dockerHubUser} -p ${env.dockerHubPass}'
                    sh 'docker push ${env.dockerHubUser}/SHARE-IT-Image:latest'

                }
            }
        }

        stage('Deployment '){
            steps{
                sh ''' 
                    kubectl apply -f deployment.yml
                    kubectl apply -f service.yml
                '''
            }
            

        }


        post{
            always{
                cleanWs() // clean Workspace after each build 
            }
            success{
                echo 'pipeline completed success fully'

            }
            failure{
                echo ' some problem occured in pipeline . IT FAILED !!!!!'
            }
        }
    }

}