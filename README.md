# Production

    # clone repo
    git clone https://github.com/manyahin/mydiary.git
    cd mydiary
    
    # set password
    echo 'DIARY_PASSWORD=123456' > .docker-env

    # build
    docker-compose build

    # start production
    npm prod