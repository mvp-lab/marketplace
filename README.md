# 自由财市 Marketplace

Our marketplace is based on the Sharetribe platform. 


### Contents
- [Installation](#installation)
- [Payments](#payments)
- [Updating](#payments)
- [Technical roadmap](#technical-roadmap)
- [Contributing](#contributing)
- [Translation](#translation)
- [Known issues](#known-issues)
- [Developer documentation](#developer-documentation)
- [License](#mit-license)

## Installation
* Good luck and God speed. You're gonna need it.

### Requirements

Before you get started, the following needs to be installed:
  * **Ruby**. Version 2.1.2 is currently used and we don't guarantee everything works with other versions.
    We are operational in 2.1.7 but YMMV ... 
  * [**RubyGems**](http://rubygems.org/) 
  * **Bundler**: `gem install bundler`
  * [**Git**](http://help.github.com/git-installation-redirect) `yum -y install git`
  * **A database**. Only MySQL has been tested. Not worth screwing around. You can install MySQL Community Server two ways:
     1. Download a [MySQL installer from here](http://dev.mysql.com/downloads/mysql/)
  * [**Sphinx**](http://pat.github.com/ts/en/installing_sphinx.html). Version 2.1.4 has been used successfully, but newer versions should work as well. Make sure to enable MySQL support. 
  * [**Imagemagick**](http://www.imagemagick.org).


### Setting up the development environment
We had trouble with this, so we skipped this step. YOLO.

1. Don't get our code. Get it from the source ... 

1. Navigate to the project root directory.
1. Create a database.yml file by copying the example database configuration:

  ```bash
  cp config/database.example.yml config/database.yml
  ```

1. Create the required databases with [these commands](https://gist.github.com/804314).
1. Add your database configuration details to `config/database.yml`. You will probably only need to fill in the password for the database(s).
1. Install the required gems by running the following command in the project root directory:

  ```bash
  bundle install
  ```

1. Initialize your database:

  ```bash
  bundle exec rake db:schema:load
  ```

1. Run Sphinx index:

  ```bash
  bundle exec rake ts:index
  ```

1. Start the Sphinx daemon:

  ```bash
  bundle exec rake ts:start
  ```

1. Use [Mailcatcher](http://mailcatcher.me) to receive sent emails locally:
    1. Install Mailcatcher:

        ```bash
        gem install mailcatcher
        ```

    1. Start it:

        ```bash
        mailcatcher
        ```

    1. Create a `config/config.yml` file and add the following lines to it:

        ```yml
        development:
          mail_delivery_method: smtp
          smtp_email_address: "localhost"
          smtp_email_port: 1025
        ```

    1. Open `http://localhost:1080` in your browser
1. Invoke the delayed job worker:

  ```bash
  bundle exec rake jobs:work
  ```

1. In a new console, open the project root folder and start the server. The simplest way is to use the included Webrick server:

  ```bash
  bundle exec rails server
  ```


Congratulations! Sharetribe should now be up and running for development purposes. Open a browser and go to the server URL (e.g. http://lvh.me:3000). Fill in the form to create a new marketplace and admin user. You should be now able to access your marketplace and modify it from the admin area.

### Database migrations

To update your local database schema to the newest version, run database migrations with:

  ```bash
  bundle exec rake db:migrate
  ```

### Running tests

Tests are handled by [RSpec](http://rspec.info/) for unit tests and [Cucumber](https://cucumber.io/) for acceptance tests.

1. Navigate to the root directory of project
1. Initialize your test database:

  ```bash
  bundle exec rake test:prepare
  ```

  This needs to be rerun whenever you make changes to your database schema.
1. If Zeus isn't running, start it:

  ```bash
  zeus start
  ```

1. To run unit tests, open another terminal and run:
  ```bash
  zeus rspec spec
  ```

1. To run acceptance tests, open another terminal and run:

  ```bash
  zeus cucumber
  ```

  Note that running acceptance tests is slow and may take a long time to complete.

To automatically run unit tests when code is changed, start [Guard](https://github.com/guard/guard):

  ```bash
  bundle exec guard
  ```

### Setting up Sharetribe for production

Before starting these steps, perform [steps 1-6 from above](#setting-up-the-development-environment).

1. Initialize your database:

  ```bash
  bundle exec rake RAILS_ENV=production db:schema:load
  ```

1. Run Sphinx index:

  ```bash
  bundle exec rake RAILS_ENV=production ts:index
  ```

1. Start the Sphinx daemon:

  ```bash
  bundle exec rake RAILS_ENV=production ts:start
  ```

1. Precompile the assets:

  ```bash
  bundle exec rake assets:precompile
  ```

1. Invoke the delayed job worker:

  ```bash
  bundle exec rake RAILS_ENV=production jobs:work
  ```

1. In a new console, open the project root folder and start the server:

  ```bash
  bundle exec rails server -e production
  ```


The built-in WEBrick server (which was started in the last step above) should not be used in production due to performance reasons. A dedicated HTTP server such as [unicorn](http://unicorn.bogomips.org/) is recommended. But it is a b***h to set up.

It is not recommended to serve static assets from a Rails server in production. But you can. And we do. If you really, really insist, instead, you could pay through the nose and use a CDN (Content Delivery Network) service, such as [Amazon CloudFront](https://aws.amazon.com/cloudfront/). But we're too poor. To serve the assets from the CDN service, you need to change the `asset_host` configuration in the the `config/config.yml` file to point your CDN distribution.

#### Setting your domain

1. In your database, change the value of the `domain` column in the `communities` table to match the hostname of your domain. For example, if the URL for your marketplace is http://mymarketplace.myhosting.com, then the domain is `mymarketplace.myhosting.com`.

1. Change the value of the `use_domain` column to `true` (or `1`) in the `communities` table.

### Advanced settings

Default configuration settings are stored in `config/config.default.yml`. If you need to change these, we recommend creating a `config/config.yml` file to override these values. You can also set configuration values to environment variables.


## Payments

Sharetribe's open source version supports payments using [Braintree Marketplace](https://www.braintreepayments.com/features/marketplace). To enable payments with Braintree, you need to have a legal business in the United States. You can sign up for Braintree [here](https://signups.braintreepayments.com/). Once that's done, create a new row in the payment gateways table with your Braintree merchant_id, master_merchant_id, public_key, private_key and client_side_encryption_key.

PayPal payments are only available on marketplaces hosted at [Sharetribe.com](https://www.sharetribe.com) due to special permissions needed from PayPal. We hope to add support for PayPal payments to the open source version of Sharetribe in the future.


## Updating

See [release notes](RELEASE_NOTES.md) for information about what has changed and if actions are needed to upgrade.


## Technical roadmap

* It's all in our heads.


## Known issues

Browse open issues if you like, but please don't submit new ones at https://github.com/ziyoucaishi/marketplace/issues.


## Developer documentation

* [Testing](docs/testing.md)
* [SCSS coding guidelines](docs/scss-coding-guidelines.md)
* [Delayed job priorities](docs/delayed-job-priorities.md)
* [Cucumber testing Do's and Don'ts](docs/cucumber-do-dont.md)
* [Technical roadmap](TECHNICAL_ROADMAP.md)


## MIT License

Marketplace is open source under the MIT license. See [LICENSE](LICENSE) for details.
