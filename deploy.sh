# Semvar versioning regex (https://github.com/semver/semver/issues/232)
SEMVAR="^v(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(-(0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(\.(0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*)?(\+[0-9a-zA-Z-]+(\.[0-9a-zA-Z-]+)*)?$"

if [[ $TRAVIS_TAG =~ $SEMVAR ]]; then
    # Decrypt the secrets file
    export GPG_TTY=$(tty)
    gpg --yes --batch --passphrase=$super_secret_password secrets.tar.gpg
    tar xvf secrets.tar

    heroku container:login
    heroku container:push -a python-sinhala web
    heroku container:release -a python-sinhala web
fi
