# Build multi-tenant user-facing analytics for a User-Generated Content (UGC) Platform with Mux and Tinybird
Learn how to build a real-time analytics app that processes playback data from Mux in Tinybird and visualizes that data in real-time on a React dashboard.

### Prerequisites

- Python 3.8
- Node.js

## Instructions

Follow these instructions to deploy the working version of this application.

### 0. Create a free Tinybird Workspace

First, create a [free Tinybird account](https://www.tinybird.co/signup). Then create a new Workspace when prompted. You can name it whatever you want.

### 1. Clone the repository

```sh
git clone https://github.com/tinybirdco/demo-user-generated-content-analytics.git
cd demo-user-generated-content-analytics
```

### 2. Install the Tinybird CLI and dependencies

```sh
cd tinybird
python -mvenv .e
. .e/bin/activate
pip install tinybird-cli confluent_kafka
```

### 3. Authenticate to Tinybird

Copy your User Admin Token from the Tinybird UI. Your user admin token is the token with the format admin <your email address>.

From the `/tinybird` directory, run the following command:

```sh
export TB_TOKEN=<your user admin token>
TB auth
```

> :warning: Your token and workspace details will be stored in a .tinyb file. If you intend to push this to a public repository, add the `.tinyb` to your `.gitignore`.

### 4. Push the resources to Tinybird
Run this command:

```sh
cd tinybird
tb push --force
```

This will push all of the data project files to the Tinybird server.


### 5. Start streaming data to Tinybird

Use the data generator to start streaming data to a topic. The script accepts a single argument for the approximate number of events per second you want to send:

```sh
cd mux-data
python generate_mux_data.py 50
```

### 6. Create tokens

Find two tokens and use the `create-jwt.js` file to create two Tinybird tokens with row-level security on the `core_stats_mv` Data Source. Then add those tokens in lines 17 and 18 of the `users/[userId]/page.tsx` file.

### 7. Run the dashboard!

```sh
npm install && npm run dev
```

### 8. Open the dashboard!

You should now have a functioning real-time dashboard at localhost:3000

## Contributing

If you find any issues or have suggestions for improvements, please submit an issue or a [pull request](https://github.com/tinybirdco/demo-user-generated-content-analytics/pulls?q=is%3Apr+is%3Aopen+sort%3Aupdated-desc).

## License

This code is available under the MIT license. See the [LICENSE](https://github.com/tinybirdco/demo-user-generated-content-analytics/blob/main/LICENSE.txt) file for more details.

## Need help?

&bull; [Community Slack](https://www.tinybird.co/community) &bull; [Tinybird Docs](https://www.tinybird.co/docs) &bull;

## Authors

- [Cameron Archer](https://github.com/tb-peregrine)
- [Dave Kiss](https://github.com/davekiss)
