# Kiwibot-locator

## Description
**Kiwibot-locator**, is sample demo api which show case how to work with [kiwibots](https://kiwibot.com), by assigning them orders, getting suggestions of the most suitable bots depending on the distance between the bot and the order's pickup location.

## Built with
:point_right: [NodeJS v16.16.0](https://nodejs.org/en/) using [Express v4.18](https://expressjs.com/)

:point_right: [Typescript v4.7](https://www.typescriptlang.org/)

:point_right: [Firebase](https://firebase.google.com/)

## How to run it on my computer locally?
Well, it's easy. You just needs to have git installed on your computer and then run `git clone https://github.com/descolar-ceo/kiwibot-locator && cd kiwibot-locator && yarn && echo PORT=4000>>.env && yarn start:debug`

If that command runs successfully, then you have the server up and running on your local comuter, on PORT 4000.

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
