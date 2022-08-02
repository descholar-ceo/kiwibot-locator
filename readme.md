# Kiwibot-locator

## Description
**Kiwibot-locator**, is sample demo api which show case how to work with [kiwibots](https://kiwibot.com), by assigning them orders, getting suggestions of the most suitable bots depending on the distance between the bot and the order's pickup location.

## Built with
:point_right: [NodeJS v16.16.0](https://nodejs.org/en/) using [Express v4.18](https://expressjs.com/)

:point_right: [Typescript v4.7](https://www.typescriptlang.org/)

:point_right: [Firebase](https://firebase.google.com/)

## How to run it on my computer locally?
Well, it's easy. You just needs to have git installed on your computer and then run `git clone https://github.com/descolar-ceo/kiwibot-locator && cd kiwibot-locator && yarn && echo PORT=4000>>.env && yarn start:debug`

## Secret keys
You will need to create a file and name it `firebase-service-account.json` on the root directory of this fresh cloned repository and copy and paste the following keys:
```json
    {
        "type": "service_account",
        "project_id": "kiwibot-locator",
        "private_key_id": "20b4a44313549925c79ee5251e1c69dfeead8b0c",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCW6b+kl+SYoEwi\nbUQNv1EraAZrHkDt2ibShyQRS0yHhlBhcJM/KXv7nund7fGaXs1tW2m4Ys9RsLyW\nCV3sWeRlkeBcE7tOq+WtjoTXb6aSQNj8KXtN8XZ+N3icSQTPq62+hzDwLLxqvcio\nE9FmmkLjQiUywkYGMb3f1TypRjAK4j0reGb85YLVSpvK2wMyaRcZtglwumODVv+E\nyv3U6mMdgjHnoRACtu2EY1syquNaL7SrXefGo445FTmuCM7u4yjPB411P+KcaroB\nLwmBkUU7ntrx7MTjyUKAP0CiXnFHFQ0X9oWYE2s1xOHM9GkXDHvpITifGZUH9uFn\nt0hcUqdrAgMBAAECggEAGCFSClBbNehTpCGSgxw3L1iXxiL1QNLj6D/BjZ5bo0Pf\nsGTetne8olQbkufL/OHxuO2n7tqlyasXzGm9AeCxu2fi1vY0ufSUafbi2Mu6d6I0\nz8UWOTVFvBLEj0DBqy8JPfDB63VLv0mPPwjEL8K0tT/LUN1tcuobMSIYa/yUC/k3\nwwOD3Mwch/9N6pp1nEzPSrz1UlPia/plAUBh0zZwRyIcWEU2lMG1/Pd+eJf4t00+\n7RswMhu58g7Rn8HZsf2/z9SKnJxvNbNVLMgCjcJ0FKaIGcUOog/xxvEQlew993ua\n3t/4l56/O9xxKucYm63bpOL0WrFapp/IoEw/Jyvf8QKBgQDUChhPPqscu4Eea+2Q\n4AY+0ur5Ag9/SWjMwyzU/VGoqDiHFxOZIEDONnm89hkhrr1jRnQSh/L7xB8y0hej\nsPQ8krDSsG3xVRIIG/s4OHTy5bnW+ZdxL+sYdR2omzy8fCjzNWloWjjN+FdepK5Z\nCR2K6U/fZxhHCOOrzFap+WF5SQKBgQC2M2XWNvX8wbi7pQgq5RnuiwtDp5V/QuBS\nkpS6TqL6FXbsi8Tf9T2llBZvpZUSSArmpti/ycuEUTnaCnHg5+eyRiakEd7eyDNS\nAWoRZSGmtqupDzIdH50WTpX28B98XdRF/lTwTP39/dhLWeibMAzorMpnkVPeeY41\nF4hnYoBvEwKBgQCpnDWb1e47+oSrF/wdIgX85OxOKObKk6b/+7N13/gc6ArnjH8B\nwrnz+cFhdJ3fwo39xlJ8rECiQVwPY9zC9H45ocFNlxEqtTjKQc+vRgHOdhI0sswA\nHyt4Ed6aiyqHPu3mtbfOYDUGFPuWWjaYQ+Fcx4o7kpTp5WNwffBo4HGm+QKBgQCI\n7HlUkbss9tyAT9aifceOJ/oQHsnPeI+iHjwdAumhrS3ROHx8ng10+KQfxT0RHwjq\nK2rqPpluV6h1PrI0BbNumx+A31kw7Rz8PMncRrcSVWcNxrivgEmKMQasK+pNiSn0\na9yjNgkOroy0m92dem/JD8mQKXvwzkLbjVLZ9wFz9wKBgAnVuCIeusRV5Z5lxVd0\nEBYmKsqRJ15Tx8N2nKyUcfDzZV801QsLYA2j/A6ixq2lS7mTlLqK5IBKBOPPVLYv\nE3bspsGNkXc8X5LSlyKcC03zobbDegALN/S4ka9jTUDdb4h3oUyB5KvhUcMKqxI6\nfZqOipfFVXBHGj6aCnJ3vDuX\n-----END PRIVATE KEY-----\n",
        "client_email": "firebase-adminsdk-p4ffx@kiwibot-locator.iam.gserviceaccount.com",
        "client_id": "109902009061854631174",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-p4ffx%40kiwibot-locator.iam.gserviceaccount.com"
  }
```

If that command runs successfully and you have created that file and pasted the keys, then you have the server up and running on your local computer, on PORT 4000.

## Features
1. User can `register a new bot`, by sending the following in request body:
```javascript
    {
        zone_id: String
        location: {
            lat: Number
            lon: Number
        }
    }
```
2. User can `get all bots` paginated by sending `page` and `limit` ans queries. If no page nor limit, by default, they will get 10 first bots. If they specify the page they want without specifying which limit, by default they will get 10 records per page.

3. User can `get one bot` by sending `botId` as a query param

4. User can `get a list of bots` in a given zone, by sending `zone_id` as a query param

5. User can `Update / Edit` a bot by specifying the `botId` in query parameters and by sending any of the following in request body:
```javascript
    {
        zone_id: String
        location: {
            lat: Number
            lon: Number
        }
        status: String // it should be one of the following values: available | busy | reserved
    }
```
6. User can `create a new order` by sending the either of the following values:
```javascript
    {
        pickup: {
            pickup_lat: Number
            pickup_lon: Number
        }

        dropoff: {
            dropoff_lat: Number
            dropoff_lon: Number
        }
        zone_id: String
    }
```
7. User can `get all orders` paginated by sending `page` and `limit` ans queries. If no page nor limit, by default, they will get 10 first bots. If they specify the page they want without specifying which limit, by default they will get 10 records per page.

8. User can `get one order` by sending `orderId` as a query param.

9. User can `get a list of orders from a given zone`, by sending `zone_id` as a query param, paginated by sending `page` and `limit` as queries. If no page nor limit, by default, they will get 10 first bots. If they specify the page they want without specifying which limit, by default they will get 10 records per page.


10. User can `get a list of orders created by a one admin`, by sending `zone_id` as a query param, paginated by sending `page` and `limit` as queries. If no page nor limit, by default, they will get 10 first bots. If they specify the page they want without specifying which limit, by default they will get 10 records per page.

_Note:_  _**[=> This feature will work perfectly after I implement the auth feature, currently I assign a random string to every order,so it will look like all of the orders are created by a one creator]**_

In the meanwhile, you can test this feature by querying this endpoint `/api/orders/randomuserid`

11. User can `Update / Edit` a bot by specifying the `botId` in query parameters and by sending any of the following in request body:
```javascript
    {
        pickup: {
            pickup_lat: Number
            pickup_lon: Number
        }

        dropoff: {
            dropoff_lat: Number
            dropoff_lon: Number
        }
        zone_id: String
        state: string // it should be a string one of the following values: "pending" | "assigned" | "in_transit" | "delivered"
    }
```
12. User can `create assign an order to a bot` by sending the following values:
```javascript
    {
        bot_id: String
        order_id: String
    }
```
13. User can `get all assignments` paginated by sending `page` and `limit` ans queries. If no page nor limit, by default, they will get 10 first bots. If they specify the page they want without specifying which limit, by default they will get 10 records per page.

14. User can `get one assignment` by sending `id` as a query param.

15. User can `get a list of orders assigned to a bot`, by sending `bot_id` as a query param, paginated by sending `page` and `limit` as queries. If no page nor limit, by default, they will get 10 first bots. If they specify the page they want without specifying which limit, by default they will get 10 records per page.


16. User can `get a list of bots assigned to a given order`, by sending `order_id` as a query param, paginated by sending `page` and `limit` as queries. If no page nor limit, by default, they will get 10 first bots. If they specify the page they want without specifying which limit, by default they will get 10 records per page.

17. User can `Remove all assignments from a bot or from an order` by sending the `bot id` or the `order id` as a query param.

18. User can `get a list of orders suggested for a given bot`, depending on the distance between that bot and those orders in descending order from the nearest one to the furthest by sending `bot_id` as a query param, paginated by sending `page` and `limit` as queries. If no page nor limit, by default, they will get 10 first orders. If they specify the page they want without specifying which limit, by default they will get 10 records per page.


19. User can `get a list of bots suggested for a given order`, by sending `order_id` as a query param, paginated by sending `page` and `limit` as queries. If no page nor limit, by default, they will get 10 first bots. If they specify the page they want without specifying which limit, by default they will get 10 records per page.

## API Documentation
After you run the server, by going on this api: `/api/docs`

## Acknowledgement
Hat tip to [Kiwibot](https://kiwibot.com) :muscle:
