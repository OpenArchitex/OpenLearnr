# Semvar versioning regex (https://github.com/semver/semver/issues/232)
SEMVAR="^v(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(-(0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(\.(0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*)?(\+[0-9a-zA-Z-]+(\.[0-9a-zA-Z-]+)*)?$"

if [[ $TRAVIS_TAG =~ $SEMVAR ]]; then
    # Decrypt the secrets file
    echo $super_secret_password | gpg --passphrase-fd 0 secrets.tar.gpg
    tar xvf secrets.tar

    # Deploy on AppEngine
    ./mvnw package -Pprod -DskipTests
    echo "pacage done"
    rm -f target/open-learnr-1.0.0.jar
    echo "open-learnr deleted"
    mv target/open-learnr-1.0.0.jar.original target/open-learnr-1.0.0.jar
    echo "renamed"
    ./mvnw appengine:stage
    echo "staged"
    jar xf target/appengine-staging/open-learnr-1.0.0.jar
    echo "jar extracted"
    rm -f target/appengine-staging/open-learnr-1.0.0.jar
    echo "removed open learner"
    ./mvnw appengine:deploy
    echo "deployed"
fi
