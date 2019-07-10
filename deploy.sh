if [[ $TRAVIS_TAG =~ ^v(.+) ]]; then
    # Decrypt the secrets file
    echo $super_secret_password | gpg --passphrase-fd 0 secrets.tar.gpg
    tar xvf secrets.tar

    # Deploy on AppEngine
    ./mvnw package appengine:deploy -Pprod,war -DskipTests
fi

