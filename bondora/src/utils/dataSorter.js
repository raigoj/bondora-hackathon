// filterOutgoingTransactions takes an array of Transactions and returns the array containing outgoing transactions only
function filterOutgoingTransactions(transactions) {
    return transactions.filter((transaction) => {
        if (transaction.transactionAmount == undefined || transaction.transactionAmount.amount == undefined) {
            return false
        }
        return transaction.transactionAmount.amount < 0
    });
}

// sortTransactionByCreditor provides an array of creditors with their corresponding transactions
function sortTransactionsByCreditor(transactions) {
    let sortedTransactions = [];
    for (const transaction of transactions) {
        if (sortedTransactions[transaction.creditorName] == undefined) {
            sortedTransactions[transaction.creditorName] = [transaction]
        } else {
            sortedTransactions[transaction.creditorName].push(transaction)

        }
    }
    return sortedTransactions
}

function filterRepeatingAmount(creditors) {
    Object.entries(creditors).forEach(([key, transactions], index) => {
        creditors[key] = removeSingleAmounts(transactions)
    })
    return creditors
}

function removeSingleAmounts(transactions) {
    return transactions.filter((transaction, index) => {
        const amount = parseInt(transaction.transactionAmount.amount, 10)
        for (let i = 0; i < transactions.length ; i++) {
            if (i === index) {
                continue
            }
            if (transactions[i].transactionAmount.amount == amount) {// < amount+ 10 && transactions[i].transactionAmount.amount > 
                return true
            }
        }
        return false
    })
}

function filterMonthlyTransaction(creditors) {
    let returnArr = creditors
    let arr = []
    for (const [key, transactions] of Object.entries(creditors)) {
        for (let i = 0; i < transactions.length; i++) {
            let transaction = transactions[i];
            let date1 = new Date(transaction.bookingDate)
            if (arr.length == 0) {
                arr.push([key, transaction])
            }
            for (let j = i+1; j < transactions.length; j++) {
                let transaction2 = transactions[j];
                let date2 = new Date(transaction2.bookingDate)
                if (differenceInMonths(date1, date2) >= 1) {
                    arr.push([key, transaction2])
                    i = j;
                    break;
                }
            }
        }
    }   
    console.log(arr)

    return returnArr
}

function checkMonthlyRecurring(transactions) {
    return transactions.filter((transaction, index) => {
        const date = new Date(transaction.bookingDate)

        if (index == 0) {
            const nextDate = new Date(transactions[index+1].bookingDate)

            if (differenceInMonths(date, nextDate) > 0) {
                return true
            }
            return false
        }

        const nextDate = new Date(transactions[index-1].bookingDate)

        console.log(date, nextDate)

        if (differenceInMonths(date, nextDate) > 0) {
            return true
        }

        return false
    })
}

function differenceInMonths(date1, date2) {

    const monthDiff = date1.getMonth() - date2.getMonth();
    const yearDiff = date1.getYear() - date2.getYear();

    return monthDiff + yearDiff * 12;
}

function filterData(data) {
    const transactions = data.bankStatements[0].transactions.booked
    transactions.push(data.bankStatements[0].transactions.pending)

    return transactions
}


function dataSorter(data) {
    data = {
        "institutionId": "WISE_TRWIGB22",
        "bankStatements": [
            {
                "accountId": "f8ce7da5-e412-40cd-bdda-2d949c2f23b6",
                "transactions": {
                    "booked": [
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NjM0NzM0MzM4",
                            "bookingDate": "2023-03-16",
                            "bookingDateTime": "2023-03-16T10:18:55.337Z",
                            "transactionAmount": {
                                "amount": "-280.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "58.3194",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "**2c2004e** Verdadero ",
                            "creditorAccount": {
                                "bban": "09478506120"
                            },
                            "remittanceInformationUnstructured": "Sent wenie grees Verdadero ",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "ae932d2b18c460848c7378312b980625"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NjM0NzMxMzMy",
                            "bookingDate": "2023-03-16",
                            "bookingDateTime": "2023-03-16T09:57:30.998Z",
                            "transactionAmount": {
                                "amount": "280.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "debtorAccount": {},
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "cf2e932e7ffe18bcd0c6e1257650b56d"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NjMyOTY1OTMx",
                            "bookingDate": "2023-03-14",
                            "bookingDateTime": "2023-03-14T11:49:04.02Z",
                            "transactionAmount": {
                                "amount": "-150.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "58.9897",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "**2c2004e** Verdadero ",
                            "creditorAccount": {
                                "bban": "09478506120"
                            },
                            "remittanceInformationUnstructured": "Sent wenie grees Verdadero ",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "306becab935f6a2ad6e310f60e0d79d6"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NjMyOTYzNzUz",
                            "bookingDate": "2023-03-14",
                            "bookingDateTime": "2023-03-14T11:32:58.551Z",
                            "transactionAmount": {
                                "amount": "150.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "debtorAccount": {},
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "16b3979aefe71d230849c9caa22b7247"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NjI5OTQ5NTM0",
                            "bookingDate": "2023-03-10",
                            "bookingDateTime": "2023-03-10T11:38:52.731Z",
                            "transactionAmount": {
                                "amount": "-40.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "58.4422",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "**2c2004e** Verdadero ",
                            "creditorAccount": {
                                "bban": "09478506120"
                            },
                            "remittanceInformationUnstructured": "Sent wenie grees Verdadero ",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "c1b0abc49ab1371c5d3f1d9753bf1a3f"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NjI5OTMwNjg1",
                            "bookingDate": "2023-03-10",
                            "bookingDateTime": "2023-03-10T11:09:55.042Z",
                            "transactionAmount": {
                                "amount": "40.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "debtorAccount": {},
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "3255be6305eb6fc2ff24c2342ce04dca"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NjI3NTY1NTI2",
                            "bookingDate": "2023-03-07",
                            "bookingDateTime": "2023-03-07T20:43:16.868Z",
                            "transactionAmount": {
                                "amount": "-210.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "58.4925",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "**2c2004e** Verdadero ",
                            "creditorAccount": {
                                "bban": "09478506120"
                            },
                            "remittanceInformationUnstructured": "Sent wenie grees Verdadero ",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "e56849ed163cb1f31ab049f7d403e4a5"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NjI3NTYyMTUw",
                            "bookingDate": "2023-03-07",
                            "bookingDateTime": "2023-03-07T20:24:52.079Z",
                            "transactionAmount": {
                                "amount": "210.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "debtorAccount": {},
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "27316f8ca8bdf2698a2a41ae8f142a6c"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NjI1MzY2NDcw",
                            "bookingDate": "2023-03-05",
                            "bookingDateTime": "2023-03-05T14:01:06.374Z",
                            "transactionAmount": {
                                "amount": "-240.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "58.6909",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "**2c2004e** Verdadero ",
                            "creditorAccount": {
                                "bban": "09478506120"
                            },
                            "remittanceInformationUnstructured": "Sent wenie grees Verdadero ",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "d38dc4578f680f192f872721be2cc687"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NjI1MzY0MTA5",
                            "bookingDate": "2023-03-05",
                            "bookingDateTime": "2023-03-05T13:40:05.309Z",
                            "transactionAmount": {
                                "amount": "240.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "debtorAccount": {},
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "7209006a90c69f53a0580251b075f20c"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NjI1MjM3MTM3",
                            "bookingDate": "2023-03-05",
                            "bookingDateTime": "2023-03-05T09:14:14.945Z",
                            "transactionAmount": {
                                "amount": "-26.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "58.6909",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "**2c2004e** Verdadero ",
                            "creditorAccount": {
                                "bban": "09478506120"
                            },
                            "remittanceInformationUnstructured": "Sent wenie grees Verdadero ",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "12a5397526301f0d3ff360807fd5658a"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NjI1MjM0Mjc4",
                            "bookingDate": "2023-03-05",
                            "bookingDateTime": "2023-03-05T08:53:48.917Z",
                            "transactionAmount": {
                                "amount": "26.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "debtorAccount": {},
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "e260a62d9bb9d37bdd0e5c7b5ad75fe0"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NjIzNjcyMjM2",
                            "bookingDate": "2023-03-03",
                            "bookingDateTime": "2023-03-03T06:32:43.036Z",
                            "transactionAmount": {
                                "amount": "-575.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "58.1913",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "**2c2004e** Verdadero ",
                            "creditorAccount": {
                                "bban": "09478506120"
                            },
                            "remittanceInformationUnstructured": "Sent wenie grees Verdadero ",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "7d141f38c42637a25bd2da3908551b77"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NjIzNjY2NjQy",
                            "bookingDate": "2023-03-03",
                            "bookingDateTime": "2023-03-03T06:08:22.299Z",
                            "transactionAmount": {
                                "amount": "575.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "debtorAccount": {},
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "aeb497bc4701eb7a51d6dea24005b668"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NjIwNzczNDAy",
                            "bookingDate": "2023-02-28",
                            "bookingDateTime": "2023-02-28T16:23:12.009Z",
                            "transactionAmount": {
                                "amount": "-75.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "58.8993",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "aicie jessa tayrus",
                            "creditorAccount": {
                                "bban": "09675660239"
                            },
                            "remittanceInformationUnstructured": "Sent aicie jessa tayrus",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "08262c05f237ecc331f812e2f230c3f3"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NjIwNzU1ODEx",
                            "bookingDate": "2023-02-28",
                            "bookingDateTime": "2023-02-28T14:16:27.793Z",
                            "transactionAmount": {
                                "amount": "65.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "debtorAccount": {},
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "70c5af866380bf355c3ee2241314c814"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NjE5MjU4MDg1",
                            "bookingDate": "2023-02-27",
                            "bookingDateTime": "2023-02-27T12:06:19.457Z",
                            "transactionAmount": {
                                "amount": "-72.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "58.6164",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "aicie jessa tayrus",
                            "creditorAccount": {
                                "bban": "09675660239"
                            },
                            "remittanceInformationUnstructured": "Sent aicie jessa tayrus",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "b9cf06ee0144b34dc365973b32b1ded3"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NjE5MjQ3NTU3",
                            "bookingDate": "2023-02-27",
                            "bookingDateTime": "2023-02-27T10:41:40.035Z",
                            "transactionAmount": {
                                "amount": "29.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "debtorAccount": {},
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "0d36547390f3c4ad8b0a50620f59569c"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NjE3OTk1MTk2",
                            "bookingDate": "2023-02-25",
                            "bookingDateTime": "2023-02-25T11:49:24.487Z",
                            "transactionAmount": {
                                "amount": "-7.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "58.2409",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "aicie jessa tayrus",
                            "creditorAccount": {
                                "bban": "09675660239"
                            },
                            "remittanceInformationUnstructured": "Sent aicie jessa tayrus",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "b38a2778095f9928c087ffad937f90b0"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NjE3MjkyNTI5",
                            "bookingDate": "2023-02-24",
                            "bookingDateTime": "2023-02-24T12:48:37.913Z",
                            "transactionAmount": {
                                "amount": "-60.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "58.3421",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "f49e9f138b7c4bd8a7985b0ebbcc9dd0"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NjE3MjM3NjA2",
                            "bookingDate": "2023-02-24",
                            "bookingDateTime": "2023-02-24T11:46:48.193Z",
                            "transactionAmount": {
                                "amount": "60.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "debtorAccount": {},
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "869cdb551a592a5d5c0641e0529ef0ee"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NjE3MDkwMTE3",
                            "bookingDate": "2023-02-24",
                            "bookingDateTime": "2023-02-24T09:32:36.733Z",
                            "transactionAmount": {
                                "amount": "60.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "debtorAccount": {},
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "65383bf27171cea01fcad9fd6a2bd292"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NjE1NDI2NTY0",
                            "bookingDate": "2023-02-22",
                            "bookingDateTime": "2023-02-22T11:53:46.184Z",
                            "transactionAmount": {
                                "amount": "-32.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "58.6669",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "**d70fe8b0a26cab51** ",
                            "creditorAccount": {
                                "bban": "09478506120"
                            },
                            "remittanceInformationUnstructured": "Sent wenie **62a6dff7b8** ",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "ae6fe215c286b293887e44e4382143a2"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NjE1NDEzNDc1",
                            "bookingDate": "2023-02-22",
                            "bookingDateTime": "2023-02-22T11:21:47.149Z",
                            "transactionAmount": {
                                "amount": "32.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "debtorAccount": {},
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "b7dc6719ccac7fd5ee3b93e6ef10298e"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NjE0OTYxMjg1",
                            "bookingDate": "2023-02-21",
                            "bookingDateTime": "2023-02-21T20:09:54.403Z",
                            "transactionAmount": {
                                "amount": "-80.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "58.6467",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "**d70fe8b0a26cab51** ",
                            "creditorAccount": {
                                "bban": "09478506120"
                            },
                            "remittanceInformationUnstructured": "Sent wenie **62a6dff7b8** ",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "d65fd6077fb9b5aafe14256203957317"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NjE0ODc2NDcw",
                            "bookingDate": "2023-02-21",
                            "bookingDateTime": "2023-02-21T17:37:45.503Z",
                            "transactionAmount": {
                                "amount": "80.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "debtorAccount": {},
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "08c15bac5f1cccf02939b519d694b3d3"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NjE0MjI2NDIy",
                            "bookingDate": "2023-02-20",
                            "bookingDateTime": "2023-02-20T22:34:19.931Z",
                            "transactionAmount": {
                                "amount": "-350.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "58.717",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "**d70fe8b0a26cab51** ",
                            "creditorAccount": {
                                "bban": "09478506120"
                            },
                            "remittanceInformationUnstructured": "Sent wenie **62a6dff7b8** ",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "dfbf1f0bc685a461e447fa525d6a08b3"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NjE0MTQzNzg0",
                            "bookingDate": "2023-02-20",
                            "bookingDateTime": "2023-02-20T19:36:14.657Z",
                            "transactionAmount": {
                                "amount": "350.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "debtorAccount": {},
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "d8a5a579e0abd6133236fe437cfe2183"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NjEyODgyNDk2",
                            "bookingDate": "2023-02-18",
                            "bookingDateTime": "2023-02-18T21:48:07.162Z",
                            "transactionAmount": {
                                "amount": "-26.80",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "59.1623",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "**2c2004e** Verdadero ",
                            "creditorAccount": {
                                "bban": "09478506120"
                            },
                            "remittanceInformationUnstructured": "Sent wenie grees Verdadero ",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "21dfe331bd832c67bcf3b4a71c3e8af3"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NjEyODgwNTA1",
                            "bookingDate": "2023-02-18",
                            "bookingDateTime": "2023-02-18T21:27:54.129Z",
                            "transactionAmount": {
                                "amount": "26.80",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "debtorAccount": {},
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "d432f88bfbea28ee2086af2b7aca066c"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NjEwOTUxNDQz",
                            "bookingDate": "2023-02-16",
                            "bookingDateTime": "2023-02-16T10:36:26.572Z",
                            "transactionAmount": {
                                "amount": "-20.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "59.0517",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "**2c2004e** Verdadero ",
                            "creditorAccount": {
                                "bban": "09478506120"
                            },
                            "remittanceInformationUnstructured": "Sent wenie grees Verdadero ",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "fac3109cf449fea5a2b7687b0c44e992"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NjEwOTQ5Mzcy",
                            "bookingDate": "2023-02-16",
                            "bookingDateTime": "2023-02-16T10:13:06.639Z",
                            "transactionAmount": {
                                "amount": "20.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "debtorAccount": {},
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "9e9b555a0e3b1fd634d27d69da743aef"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NjA3ODcxODg3",
                            "bookingDate": "2023-02-12",
                            "bookingDateTime": "2023-02-12T21:12:48.571Z",
                            "transactionAmount": {
                                "amount": "-85.14",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "58.2107",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "**2c2004e** Verdadero ",
                            "creditorAccount": {
                                "bban": "09478506120"
                            },
                            "remittanceInformationUnstructured": "Sent wenie grees Verdadero ",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "446b6b44da11b1876fae1f4bab7d9209"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NjA3ODcwMDM5",
                            "bookingDate": "2023-02-12",
                            "bookingDateTime": "2023-02-12T20:50:36.094Z",
                            "transactionAmount": {
                                "amount": "85.14",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "5e2e7ee0db39e6898f69e93d45163349"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NjAyNDUzMDcw",
                            "bookingDate": "2023-02-06",
                            "bookingDateTime": "2023-02-06T04:54:03.019Z",
                            "transactionAmount": {
                                "amount": "-147.50",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "58.5347",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "**2c2004e** Verdadero ",
                            "creditorAccount": {
                                "bban": "09478506120"
                            },
                            "remittanceInformationUnstructured": "Sent Wenie grees Verdadero ",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "ccb26e3874e501daeca392061bbdf369"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NjAyNDQ5MjIz",
                            "bookingDate": "2023-02-06",
                            "bookingDateTime": "2023-02-06T04:27:02.693Z",
                            "transactionAmount": {
                                "amount": "147.50",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "73f156bd90bc2fe44cbd31e885ffa535"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NjAwMzgxNzkz",
                            "bookingDate": "2023-02-03",
                            "bookingDateTime": "2023-02-03T01:03:47.601Z",
                            "transactionAmount": {
                                "amount": "-840.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "59.0321",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "**2c2004e** Verdadero ",
                            "creditorAccount": {
                                "bban": "09478506120"
                            },
                            "remittanceInformationUnstructured": "Sent wenie grees Verdadero ",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "d9232075b056d4b541b1b8595a64e8a3"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NjAwMzc4OTQy",
                            "bookingDate": "2023-02-03",
                            "bookingDateTime": "2023-02-03T00:29:38.667Z",
                            "transactionAmount": {
                                "amount": "840.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "bd3f8505b079bcc3fea19f826ca1acad"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NTk0MjExNTk0",
                            "bookingDate": "2023-01-27",
                            "bookingDateTime": "2023-01-27T03:46:28.623Z",
                            "transactionAmount": {
                                "amount": "-90.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "59.0581",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "ca11f27319e59ed89f25726e51ebed18"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NTk0MjExMDY4",
                            "bookingDate": "2023-01-27",
                            "bookingDateTime": "2023-01-27T03:43:58.332Z",
                            "transactionAmount": {
                                "amount": "90.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "0a12ecfc9c8fc6ba991d5fcbf57ace37"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NTkwNDIxNzA1",
                            "bookingDate": "2023-01-22",
                            "bookingDateTime": "2023-01-22T07:16:34.711Z",
                            "transactionAmount": {
                                "amount": "-142.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "59.1086",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "899b0a9f7279298c1d62a5e4eca93b21"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NTkwNDE5NzQw",
                            "bookingDate": "2023-01-22",
                            "bookingDateTime": "2023-01-22T07:06:33.303Z",
                            "transactionAmount": {
                                "amount": "142.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "7f5d077fa0502b5181c2b8e4849415d4"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NTg5NDI2MzYy",
                            "bookingDate": "2023-01-20",
                            "bookingDateTime": "2023-01-20T11:55:39.502Z",
                            "transactionAmount": {
                                "amount": "-129.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "58.9851",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "6d5b4dc42e5bfd524c2a10710017cb50"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NTg5NDE3NTgw",
                            "bookingDate": "2023-01-20",
                            "bookingDateTime": "2023-01-20T11:44:25.593Z",
                            "transactionAmount": {
                                "amount": "129.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "02ddf79d63fdfd291ed1c5bee57167d6"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NTg4MDQwNzQy",
                            "bookingDate": "2023-01-18",
                            "bookingDateTime": "2023-01-18T16:30:30.845Z",
                            "transactionAmount": {
                                "amount": "-800.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "59.0932",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "6132bc22be1383eb55cb8d71a853ce6b"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NTg4MDM5NjUw",
                            "bookingDate": "2023-01-18",
                            "bookingDateTime": "2023-01-18T16:29:00.423Z",
                            "transactionAmount": {
                                "amount": "800.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "b2c1b0aadc871983e218bab0e6a62831"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NTg3ODk3Njkw",
                            "bookingDate": "2023-01-18",
                            "bookingDateTime": "2023-01-18T13:29:51.778Z",
                            "transactionAmount": {
                                "amount": "-50.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "59.1204",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "4d51479e393331c823bda663df715b73"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NTg3ODk2MjMw",
                            "bookingDate": "2023-01-18",
                            "bookingDateTime": "2023-01-18T13:26:42.757Z",
                            "transactionAmount": {
                                "amount": "50.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "d6561c1b006149b096a85432c449be2a"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NTg3NzY1MzU5",
                            "bookingDate": "2023-01-18",
                            "bookingDateTime": "2023-01-18T10:45:16.467Z",
                            "transactionAmount": {
                                "amount": "-128.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "59.204",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "64add940710cafccc3db1ce02e2dc281"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NTg3NzU5NTk0",
                            "bookingDate": "2023-01-18",
                            "bookingDateTime": "2023-01-18T10:38:03.217Z",
                            "transactionAmount": {
                                "amount": "128.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "0e189de1516debfad740fb280e1b0b0b"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NTg1ODAzNjgy",
                            "bookingDate": "2023-01-16",
                            "bookingDateTime": "2023-01-16T06:04:03.488Z",
                            "transactionAmount": {
                                "amount": "-911.18",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "59.4433",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "2b9e821bda1e5595a6fdc0caf892bab0"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NTg0ODk2NDA1",
                            "bookingDate": "2023-01-16",
                            "bookingDateTime": "2023-01-16T04:32:39.285Z",
                            "transactionAmount": {
                                "amount": "-205.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "59.4507",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "5d28075f9b4c12acf4059be44e9706a0"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpDQVJEX1RSQU5TQUNUSU9OOjo1NjEyMDE4NDM=",
                            "bookingDate": "2023-01-15",
                            "bookingDateTime": "2023-01-15T04:29:03Z",
                            "transactionAmount": {
                                "amount": "-88.82",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "59.4507",
                                "targetCurrency": "PHP"
                            },
                            "remittanceInformationUnstructured": "Withdrawn Dipolog",
                            "proprietaryBankTransactionCode": "CARD_TRANSACTION",
                            "internalTransactionId": "b93448aaaccb6677ba47dfbc7ba59391"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NTg1MzA1NDU2",
                            "bookingDate": "2023-01-15",
                            "bookingDateTime": "2023-01-15T00:13:37.174Z",
                            "transactionAmount": {
                                "amount": "1000.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "24502ee4c52cef48b96d630a72e8e55c"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NTg0Njc2MzQ4",
                            "bookingDate": "2023-01-13",
                            "bookingDateTime": "2023-01-13T19:10:08.975Z",
                            "transactionAmount": {
                                "amount": "105.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "f8aa8164c40e00a2f445299213f5d30a"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NTgzMzUzNDAy",
                            "bookingDate": "2023-01-12",
                            "bookingDateTime": "2023-01-12T09:54:29.934Z",
                            "transactionAmount": {
                                "amount": "-500.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "59.5112",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "1ab00e375d3ddd56c3e44208919ab256"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NTgyNzAyMjUz",
                            "bookingDate": "2023-01-11",
                            "bookingDateTime": "2023-01-11T13:10:49.075Z",
                            "transactionAmount": {
                                "amount": "600.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "da11cbbf0261bb93862702e06bda35a7"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NTgxNTQxNTIx",
                            "bookingDate": "2023-01-10",
                            "bookingDateTime": "2023-01-10T07:03:10.753Z",
                            "transactionAmount": {
                                "amount": "-1140.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "58.8859",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "dab3843d7f47fc4a1d7e96dd1b2f3a35"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NTgxNTQwNjQx",
                            "bookingDate": "2023-01-10",
                            "bookingDateTime": "2023-01-10T07:00:26.387Z",
                            "transactionAmount": {
                                "amount": "1140.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "637dcc03e01c5e81df7ecd80f812c841"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NTgxMDg2MjAz",
                            "bookingDate": "2023-01-09",
                            "bookingDateTime": "2023-01-09T15:53:54.175Z",
                            "transactionAmount": {
                                "amount": "-33.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "59.0452",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "84948e2544c8520c16a1818086354546"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NTgxMDY5MzE3",
                            "bookingDate": "2023-01-09",
                            "bookingDateTime": "2023-01-09T15:19:00.025Z",
                            "transactionAmount": {
                                "amount": "33.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "ec3964d27e1966c4dab07451220f6faa"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NTc5MTc0MjQx",
                            "bookingDate": "2023-01-06",
                            "bookingDateTime": "2023-01-06T15:02:52.052Z",
                            "transactionAmount": {
                                "amount": "-255.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "58.3132",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "5ca22db2fdeea22f13c49ca91d05b488"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NTc5MTczMDI2",
                            "bookingDate": "2023-01-06",
                            "bookingDateTime": "2023-01-06T14:59:36.442Z",
                            "transactionAmount": {
                                "amount": "255.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "18b06eac5c42a3f7137728f53ef0dbce"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NTc4Nzg5NTc0",
                            "bookingDate": "2023-01-06",
                            "bookingDateTime": "2023-01-06T07:29:08.704Z",
                            "transactionAmount": {
                                "amount": "-60.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "58.4493",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "a03d5f1500e68fe25ed360142bb73fd6"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NTc4Nzg4NzU2",
                            "bookingDate": "2023-01-06",
                            "bookingDateTime": "2023-01-06T07:26:37.458Z",
                            "transactionAmount": {
                                "amount": "60.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "71da33d41ae0603386711717f4b17a88"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NTc3NTM2MjQ3",
                            "bookingDate": "2023-01-04",
                            "bookingDateTime": "2023-01-04T17:08:03.882Z",
                            "transactionAmount": {
                                "amount": "-570.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "59.3921",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "f2c149347e80d3fc327e3604f51744b8"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NTc3NTM1Mjg2",
                            "bookingDate": "2023-01-04",
                            "bookingDateTime": "2023-01-04T17:05:35.737Z",
                            "transactionAmount": {
                                "amount": "570.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "294f264ca9ea433d182ae862c0502754"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NTc2MDQ1NDA2",
                            "bookingDate": "2023-01-03",
                            "bookingDateTime": "2023-01-03T06:17:57.111Z",
                            "transactionAmount": {
                                "amount": "-430.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "59.4349",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "8b4e56323e27f0c791f792846c073f39"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NTc2MDQ0NzQy",
                            "bookingDate": "2023-01-03",
                            "bookingDateTime": "2023-01-03T06:15:56.382Z",
                            "transactionAmount": {
                                "amount": "430.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "4fab7fd45d6ed4b6ff0b745747331f7f"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NTc0NDM4NzM0",
                            "bookingDate": "2022-12-31",
                            "bookingDateTime": "2022-12-31T14:16:05.341Z",
                            "transactionAmount": {
                                "amount": "-10.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "59.6215",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "36f1586e6f62755b4719aa7b70e71b6f"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NTc0NDM3OTU2",
                            "bookingDate": "2022-12-31",
                            "bookingDateTime": "2022-12-31T14:14:11.83Z",
                            "transactionAmount": {
                                "amount": "10.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "7b8a1fdddadf00ba27eb0c3400942019"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NTczMzk1MTYy",
                            "bookingDate": "2022-12-30",
                            "bookingDateTime": "2022-12-30T08:27:46.959Z",
                            "transactionAmount": {
                                "amount": "-120.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "59.3565",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "e72c30528b25d55efe6ced491b0d4e54"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NTczMzk0Mjkz",
                            "bookingDate": "2022-12-30",
                            "bookingDateTime": "2022-12-30T08:26:36.491Z",
                            "transactionAmount": {
                                "amount": "120.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "f4eeec4a91f83183a8a800c112505626"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NTcwODk2ODg0",
                            "bookingDate": "2022-12-27",
                            "bookingDateTime": "2022-12-27T10:06:56.075Z",
                            "transactionAmount": {
                                "amount": "-160.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "59.4678",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "c5ae95fd3523fe8135699b38513cca1f"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NTcwODk1MDk4",
                            "bookingDate": "2022-12-27",
                            "bookingDateTime": "2022-12-27T10:04:48.097Z",
                            "transactionAmount": {
                                "amount": "55.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "987d754baae89f1c5b677b62b2e55a7a"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NTcwODkyMTcy",
                            "bookingDate": "2022-12-27",
                            "bookingDateTime": "2022-12-27T10:00:10.751Z",
                            "transactionAmount": {
                                "amount": "105.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "3a49fb093b82e11f4ed53245e38a32fb"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NTY1MDQ4NDM0",
                            "bookingDate": "2022-12-19",
                            "bookingDateTime": "2022-12-19T11:28:14.887Z",
                            "transactionAmount": {
                                "amount": "-50.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "58.8134",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "59de8fb3dda93e6376f8cdbd575d3dff"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NTY1MDM3NTQx",
                            "bookingDate": "2022-12-19",
                            "bookingDateTime": "2022-12-19T11:21:13.497Z",
                            "transactionAmount": {
                                "amount": "50.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "c4cbad80c7e0a745f8fe04795e1deaab"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NTY0MjU0Mzg2",
                            "bookingDate": "2022-12-18",
                            "bookingDateTime": "2022-12-18T01:30:35.64Z",
                            "transactionAmount": {
                                "amount": "-9.20",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "58.7521",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "cadc4be0ad2d7f3023dae1571b21ed54"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NTY0MjU0MDA0",
                            "bookingDate": "2022-12-17",
                            "bookingDateTime": "2022-12-17T23:52:30.382Z",
                            "transactionAmount": {
                                "amount": "9.20",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "d3b4b05618185ba00f4b18ce3f7744a2"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NTYyNjQ5NjM0",
                            "bookingDate": "2022-12-15",
                            "bookingDateTime": "2022-12-15T16:28:03.685Z",
                            "transactionAmount": {
                                "amount": "-192.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "59.3951",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "d9b5013eb9ba4f8122f52f4fdf4da239"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NTYyNjQ2Nzk0",
                            "bookingDate": "2022-12-15",
                            "bookingDateTime": "2022-12-15T16:24:41.161Z",
                            "transactionAmount": {
                                "amount": "192.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "4c04a39e672ead03db815ffaabf78957"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NTYwNzc0ODYy",
                            "bookingDate": "2022-12-13",
                            "bookingDateTime": "2022-12-13T13:56:22.093Z",
                            "transactionAmount": {
                                "amount": "-45.40",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "59.2761",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "3897ba7841a66884b8292f712f0ed46f"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NTYwNzY5NDg2",
                            "bookingDate": "2022-12-13",
                            "bookingDateTime": "2022-12-13T13:50:25.147Z",
                            "transactionAmount": {
                                "amount": "45.40",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "062d0df145aaa45deaa63cb4032cb4b4"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NTU5MTU2NTU1",
                            "bookingDate": "2022-12-11",
                            "bookingDateTime": "2022-12-11T15:07:46.525Z",
                            "transactionAmount": {
                                "amount": "-74.60",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "58.3179",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "e583e91f7e37b928daeef152e0747071"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NTU5MTU2MDAw",
                            "bookingDate": "2022-12-11",
                            "bookingDateTime": "2022-12-11T15:04:15.769Z",
                            "transactionAmount": {
                                "amount": "74.60",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "f498a08aeabd7728982f2f8816ddefec"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NTU4NzA0NzQ1",
                            "bookingDate": "2022-12-10",
                            "bookingDateTime": "2022-12-10T14:14:31.402Z",
                            "transactionAmount": {
                                "amount": "-210.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "58.3179",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "abda0af0f3bdd01bf505af2d2190d471"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NTU4NzAyMjA0",
                            "bookingDate": "2022-12-10",
                            "bookingDateTime": "2022-12-10T14:10:54.32Z",
                            "transactionAmount": {
                                "amount": "210.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "6adb5cffed6d33d1aa8264d1824e1dd5"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NTU3MTA4ODQy",
                            "bookingDate": "2022-12-08",
                            "bookingDateTime": "2022-12-08T11:49:42.072Z",
                            "transactionAmount": {
                                "amount": "-80.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "58.1354",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "5f196b273a19f925d08e309281955f06"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NTU3MTA0ODY3",
                            "bookingDate": "2022-12-08",
                            "bookingDateTime": "2022-12-08T11:44:10.177Z",
                            "transactionAmount": {
                                "amount": "80.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "27c993e27237d88f24eb2d04da1d58ee"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NTUzMTc0MTAz",
                            "bookingDate": "2022-12-03",
                            "bookingDateTime": "2022-12-03T09:37:46.535Z",
                            "transactionAmount": {
                                "amount": "-125.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "58.7607",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "9fd288c9df1b3bdb2146d4c795c85d81"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NTUzMTczMjg1",
                            "bookingDate": "2022-12-03",
                            "bookingDateTime": "2022-12-03T09:35:44.1Z",
                            "transactionAmount": {
                                "amount": "125.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "fd6a4e30006445e98965dac16b1413e6"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NTUzMDE1MzA4",
                            "bookingDate": "2022-12-03",
                            "bookingDateTime": "2022-12-03T01:30:43.418Z",
                            "transactionAmount": {
                                "amount": "-100.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "58.7607",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "a36ab8dfacf3536d0c51f3f55987ec77"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NTUzMDE0MTgx",
                            "bookingDate": "2022-12-02",
                            "bookingDateTime": "2022-12-02T23:43:24.974Z",
                            "transactionAmount": {
                                "amount": "100.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "6209428aed2368ea99ab2b04a46e441b"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NTUxNTE2MDY5",
                            "bookingDate": "2022-12-01",
                            "bookingDateTime": "2022-12-01T12:50:21.584Z",
                            "transactionAmount": {
                                "amount": "-40.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "58.7511",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "1dd046887643bfdbc1435d462c3320b6"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NTUxNTE0MzAx",
                            "bookingDate": "2022-12-01",
                            "bookingDateTime": "2022-12-01T12:49:11.623Z",
                            "transactionAmount": {
                                "amount": "40.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "b2d09a863331ec20f73208f9dabf5353"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NTQ5NTUwODk0",
                            "bookingDate": "2022-11-29",
                            "bookingDateTime": "2022-11-29T13:28:05.532Z",
                            "transactionAmount": {
                                "amount": "-300.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "58.6518",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "c936be08eae960b25c01a93e0a9cce7a"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NTQ5NTQ5Mjc2",
                            "bookingDate": "2022-11-29",
                            "bookingDateTime": "2022-11-29T13:24:54.031Z",
                            "transactionAmount": {
                                "amount": "300.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "0d2c570f36ecea531439ba1d5315ebb5"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NTQ4MjE2MTI5",
                            "bookingDate": "2022-11-28",
                            "bookingDateTime": "2022-11-28T06:16:55.652Z",
                            "transactionAmount": {
                                "amount": "-600.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "58.7848",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "e2f26428ac1be9b4653ae3c8175669cb"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NTQ4MjE1NjE4",
                            "bookingDate": "2022-11-28",
                            "bookingDateTime": "2022-11-28T06:13:26.841Z",
                            "transactionAmount": {
                                "amount": "600.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "6298301173050ca4f6987fe01ddefa88"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NTQ2NDI1MjMx",
                            "bookingDate": "2022-11-25",
                            "bookingDateTime": "2022-11-25T06:18:23.499Z",
                            "transactionAmount": {
                                "amount": "-30.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "59.0758",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "63fd478ab5313678f8af12cbe2e34500"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NTQ2NDI0NjI4",
                            "bookingDate": "2022-11-25",
                            "bookingDateTime": "2022-11-25T06:16:16.342Z",
                            "transactionAmount": {
                                "amount": "30.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "37379fd752e643243c9345b9cc860f29"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NTQ1NTQ5OTM1",
                            "bookingDate": "2022-11-24",
                            "bookingDateTime": "2022-11-24T01:38:14.603Z",
                            "transactionAmount": {
                                "amount": "-45.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "59.0739",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "d58174687a4bd375574af637f1392aff"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NTQ1NTQ5NDA1",
                            "bookingDate": "2022-11-23",
                            "bookingDateTime": "2022-11-23T23:46:18.838Z",
                            "transactionAmount": {
                                "amount": "45.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "ea609258aa1adf8fa0fdc8376776557b"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NTQ0MjgyMDIy",
                            "bookingDate": "2022-11-22",
                            "bookingDateTime": "2022-11-22T10:02:53.019Z",
                            "transactionAmount": {
                                "amount": "-35.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "58.9046",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "800f086df6630404bb8e3a9825e1071d"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NTQ0Mjc4MDEz",
                            "bookingDate": "2022-11-22",
                            "bookingDateTime": "2022-11-22T09:56:17.449Z",
                            "transactionAmount": {
                                "amount": "35.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "3015b09c8007103789090623fa2c127e"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NTQzODQ1Mzc2",
                            "bookingDate": "2022-11-21",
                            "bookingDateTime": "2022-11-21T17:05:22.354Z",
                            "transactionAmount": {
                                "amount": "-350.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "58.7208",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "25cbfd7186b343d02d8e193fe02e5704"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NTQzODQzOTkx",
                            "bookingDate": "2022-11-21",
                            "bookingDateTime": "2022-11-21T17:03:21.089Z",
                            "transactionAmount": {
                                "amount": "350.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "6599e107d7826f5d48fcee1193bb8f84"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NTQyNDg0Mzg2",
                            "bookingDate": "2022-11-19",
                            "bookingDateTime": "2022-11-19T08:16:10.171Z",
                            "transactionAmount": {
                                "amount": "-125.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "59.1313",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "b655d8674be9801dbacff417bf6f2a9a"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NTQyNDgzMDI0",
                            "bookingDate": "2022-11-19",
                            "bookingDateTime": "2022-11-19T08:11:49.362Z",
                            "transactionAmount": {
                                "amount": "125.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "d208c36ffcdf5617b1dfc777d0cbbafc"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NTM4ODc5MzQ5",
                            "bookingDate": "2022-11-14",
                            "bookingDateTime": "2022-11-14T16:14:23.092Z",
                            "transactionAmount": {
                                "amount": "-40.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "59.1254",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "85a8793748c46234e86a9981c96e34eb"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NTM4ODc3OTQw",
                            "bookingDate": "2022-11-14",
                            "bookingDateTime": "2022-11-14T16:13:04.743Z",
                            "transactionAmount": {
                                "amount": "40.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "b2f40767d90a98465e8495a624aaaf86"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NTM3NjcwMDUx",
                            "bookingDate": "2022-11-12",
                            "bookingDateTime": "2022-11-12T14:52:13.719Z",
                            "transactionAmount": {
                                "amount": "-110.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "59.2352",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "8b0fe18c6fdd1a4fb5ffa44265159ec0"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NTM3NjY5NTAw",
                            "bookingDate": "2022-11-12",
                            "bookingDateTime": "2022-11-12T14:49:32.563Z",
                            "transactionAmount": {
                                "amount": "110.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "a9652c257ace0d031898f57e4199494b"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NTM3NjI3OTc1",
                            "bookingDate": "2022-11-12",
                            "bookingDateTime": "2022-11-12T13:13:54.475Z",
                            "transactionAmount": {
                                "amount": "-36.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "59.2352",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "8a171bc0f9a40fba515f5df1742f0d56"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NTM3NjI3MDU1",
                            "bookingDate": "2022-11-12",
                            "bookingDateTime": "2022-11-12T13:11:22.039Z",
                            "transactionAmount": {
                                "amount": "36.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "28d1e14c2e6557efb8b62c8c38a5e79b"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NTM1NDE5ODIy",
                            "bookingDate": "2022-11-09",
                            "bookingDateTime": "2022-11-09T15:23:18.336Z",
                            "transactionAmount": {
                                "amount": "-275.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "58.2633",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "8bad1dc6d19e1344330ccffeba4f89ea"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NTM1NDE4MzMx",
                            "bookingDate": "2022-11-09",
                            "bookingDateTime": "2022-11-09T15:20:23.201Z",
                            "transactionAmount": {
                                "amount": "275.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "cc5565348b7b210b5955ade1aabba870"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NTMyODMwMjg1",
                            "bookingDate": "2022-11-06",
                            "bookingDateTime": "2022-11-06T08:41:34.967Z",
                            "transactionAmount": {
                                "amount": "-450.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "58.0908",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "b611888b4b0719750813a6fc2e8fa9b7"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NTMyODI5ODIx",
                            "bookingDate": "2022-11-06",
                            "bookingDateTime": "2022-11-06T08:39:38.734Z",
                            "transactionAmount": {
                                "amount": "450.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "60409f65c7d0f1049b510a1ca4dffc1c"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NTI5MjMxMzEz",
                            "bookingDate": "2022-11-01",
                            "bookingDateTime": "2022-11-01T14:24:06.095Z",
                            "transactionAmount": {
                                "amount": "-20.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "57.5324",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "e75971d8a3539313bee92c8ea8b967c7"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NTI5MjI3NTY3",
                            "bookingDate": "2022-11-01",
                            "bookingDateTime": "2022-11-01T14:18:28.237Z",
                            "transactionAmount": {
                                "amount": "20.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "0e311560d553d846eb1255a4380c6ff6"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NTI4MTE1OTc4",
                            "bookingDate": "2022-10-31",
                            "bookingDateTime": "2022-10-31T12:48:50.571Z",
                            "transactionAmount": {
                                "amount": "-4.40",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "57.8192",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "4bdd4bb41c8cb4cb21b10bc73deffd24"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NTI4MDgyNzQ4",
                            "bookingDate": "2022-10-31",
                            "bookingDateTime": "2022-10-31T12:26:10.657Z",
                            "transactionAmount": {
                                "amount": "4.40",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "60bb805f8631829e05bf92f0b769ebde"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NTI1NDQyOTI2",
                            "bookingDate": "2022-10-27",
                            "bookingDateTime": "2022-10-27T12:49:26.977Z",
                            "transactionAmount": {
                                "amount": "-10.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "58.3599",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "72512b3d488f2f395f6a1226b146ff68"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NTI1NDQxNzAy",
                            "bookingDate": "2022-10-27",
                            "bookingDateTime": "2022-10-27T12:46:51.111Z",
                            "transactionAmount": {
                                "amount": "10.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "850f8075abef383d5e65eda1de7cb63a"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NTI0MDIwNjE5",
                            "bookingDate": "2022-10-25",
                            "bookingDateTime": "2022-10-25T17:48:42.078Z",
                            "transactionAmount": {
                                "amount": "-300.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "58.3978",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "2bc05af7002a58251b53d9b948b031ca"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NTI0MDE5NTc1",
                            "bookingDate": "2022-10-25",
                            "bookingDateTime": "2022-10-25T17:47:03.187Z",
                            "transactionAmount": {
                                "amount": "300.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "4371b649c23ad592c4a8bd7da178d8b9"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NTIyNzI3NTQ1",
                            "bookingDate": "2022-10-24",
                            "bookingDateTime": "2022-10-24T08:24:03.678Z",
                            "transactionAmount": {
                                "amount": "-40.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "57.8476",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "dd820e2d91fae04635a3144728fea1f6"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NTIyNzIzNjgz",
                            "bookingDate": "2022-10-24",
                            "bookingDateTime": "2022-10-24T08:20:11.606Z",
                            "transactionAmount": {
                                "amount": "40.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "b75748cffbb7f1d1b65f208fb93b1834"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NTIxOTAzMTA1",
                            "bookingDate": "2022-10-22",
                            "bookingDateTime": "2022-10-22T11:23:43.084Z",
                            "transactionAmount": {
                                "amount": "-40.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "58.0684",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "2be461a1c33e48fa498ce111c0e9d6d2"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NTIxOTAyNTE4",
                            "bookingDate": "2022-10-22",
                            "bookingDateTime": "2022-10-22T11:22:24.074Z",
                            "transactionAmount": {
                                "amount": "40.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "783dae8fc97c370e4b10ee41df7c0af2"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NTIxNzg4OTU2",
                            "bookingDate": "2022-10-22",
                            "bookingDateTime": "2022-10-22T06:12:48.11Z",
                            "transactionAmount": {
                                "amount": "-40.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "58.0684",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "8073d2fc3f4153295d8319284351f1e2"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NTIxNzg4NTU5",
                            "bookingDate": "2022-10-22",
                            "bookingDateTime": "2022-10-22T06:10:22.736Z",
                            "transactionAmount": {
                                "amount": "40.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "f283c9a2ef0a91cab16586dc265394c2"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NTE5OTM0MTA4",
                            "bookingDate": "2022-10-19",
                            "bookingDateTime": "2022-10-19T14:20:26.842Z",
                            "transactionAmount": {
                                "amount": "-102.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "57.7442",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "91900650249105ce136799869579a9ed"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NTE5OTMzMzQz",
                            "bookingDate": "2022-10-19",
                            "bookingDateTime": "2022-10-19T14:17:15.385Z",
                            "transactionAmount": {
                                "amount": "102.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "6eefdd6df31c2c37e60d9ed102963029"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NTE4OTQ1OTM2",
                            "bookingDate": "2022-10-18",
                            "bookingDateTime": "2022-10-18T08:51:03.812Z",
                            "transactionAmount": {
                                "amount": "-100.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "57.9585",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "c9d81aa4924f2fd6a1f9e536e90a1eb7"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NTE4OTQ1MDI1",
                            "bookingDate": "2022-10-18",
                            "bookingDateTime": "2022-10-18T08:49:35.959Z",
                            "transactionAmount": {
                                "amount": "100.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "d8df2d573adbde18f40cb5e44ad053c9"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NTE3MjY3NDgx",
                            "bookingDate": "2022-10-15",
                            "bookingDateTime": "2022-10-15T14:25:48.885Z",
                            "transactionAmount": {
                                "amount": "-220.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "57.3952",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "a640d8e30eb346764141f2019d30893f"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NTE3MjY3MDY4",
                            "bookingDate": "2022-10-15",
                            "bookingDateTime": "2022-10-15T14:24:15.38Z",
                            "transactionAmount": {
                                "amount": "220.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "880927bea3b4cf9f6f213b0781b0e16b"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NTE2OTcxOTQ5",
                            "bookingDate": "2022-10-14",
                            "bookingDateTime": "2022-10-14T22:21:09.075Z",
                            "transactionAmount": {
                                "amount": "-250.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "57.3952",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "625bd7594318970bd3ba39c58559ea36"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NTE2OTcxMzMx",
                            "bookingDate": "2022-10-14",
                            "bookingDateTime": "2022-10-14T22:17:58.274Z",
                            "transactionAmount": {
                                "amount": "250.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "e15f14d135c70a184d1cc26977ab3dde"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NTEzNTM2ODUz",
                            "bookingDate": "2022-10-10",
                            "bookingDateTime": "2022-10-10T14:22:19.39Z",
                            "transactionAmount": {
                                "amount": "-20.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "57.1826",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "12ee92b061c1f60069aa0a010f2346b7"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NTEzNTM1NzYy",
                            "bookingDate": "2022-10-10",
                            "bookingDateTime": "2022-10-10T14:21:12.126Z",
                            "transactionAmount": {
                                "amount": "20.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "c16587b9a039979c37ccd9e2e503857e"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NTEzMzQ3MjAx",
                            "bookingDate": "2022-10-10",
                            "bookingDateTime": "2022-10-10T10:47:40.947Z",
                            "transactionAmount": {
                                "amount": "-50.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "57.1824",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "6a52c93f4679c5b33e32c0137c3c7ad5"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NTEzMzQ2MTMy",
                            "bookingDate": "2022-10-10",
                            "bookingDateTime": "2022-10-10T10:44:19.197Z",
                            "transactionAmount": {
                                "amount": "50.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "8d356415abc6b4adb1adfab1d83a2839"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NTEyNTgxOTE1",
                            "bookingDate": "2022-10-08",
                            "bookingDateTime": "2022-10-08T22:34:26.533Z",
                            "transactionAmount": {
                                "amount": "-605.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "57.5324",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "47ab47a9f7d6dbac6513fc50e9328bbc"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NTEyNTgxMjAz",
                            "bookingDate": "2022-10-08",
                            "bookingDateTime": "2022-10-08T22:31:40.238Z",
                            "transactionAmount": {
                                "amount": "605.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "46295b3bdfd6cc388fae26f5600d5d97"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NTExNDcxMzM3",
                            "bookingDate": "2022-10-07",
                            "bookingDateTime": "2022-10-07T06:28:41.636Z",
                            "transactionAmount": {
                                "amount": "-200.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "57.568",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "ba3e7673dfeada8593a1c1024c184ec2"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NTExNDcwOTMz",
                            "bookingDate": "2022-10-07",
                            "bookingDateTime": "2022-10-07T06:26:35.958Z",
                            "transactionAmount": {
                                "amount": "200.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "a26ca6656a769d3738b5336938ed65e1"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NTEwNzg4MzQ4",
                            "bookingDate": "2022-10-06",
                            "bookingDateTime": "2022-10-06T09:06:18.016Z",
                            "transactionAmount": {
                                "amount": "-50.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "58.0939",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "d580f5b06a6c5eabc562ad4e83418cd2"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NTEwNzg3MTE1",
                            "bookingDate": "2022-10-06",
                            "bookingDateTime": "2022-10-06T09:04:49.018Z",
                            "transactionAmount": {
                                "amount": "50.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "643e27128a1f601c8071c11bdb415d02"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NTA5MTUyODQw",
                            "bookingDate": "2022-10-04",
                            "bookingDateTime": "2022-10-04T10:29:55.066Z",
                            "transactionAmount": {
                                "amount": "-350.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "58.1171",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "fdd478bb4614500f6f4b297d531b20b5"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NTA5MTUxNzg2",
                            "bookingDate": "2022-10-04",
                            "bookingDateTime": "2022-10-04T10:28:04.153Z",
                            "transactionAmount": {
                                "amount": "350.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "6ca659eb50f14589e8b01b8b120d551d"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NTA2MTc0OTUw",
                            "bookingDate": "2022-09-30",
                            "bookingDateTime": "2022-09-30T11:48:44.949Z",
                            "transactionAmount": {
                                "amount": "-460.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "57.34",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "9441120413d77016d4070112c2078b84"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NTA2MTczNDY2",
                            "bookingDate": "2022-09-30",
                            "bookingDateTime": "2022-09-30T11:46:16.874Z",
                            "transactionAmount": {
                                "amount": "460.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "0da429d6279ec208efa790ad858266a7"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NTA1MzQzNjUw",
                            "bookingDate": "2022-09-29",
                            "bookingDateTime": "2022-09-29T14:34:13.452Z",
                            "transactionAmount": {
                                "amount": "-360.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "57.0588",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "6e13e8fb6bb799828c20870343169ce2"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NTA1MzQyMjY5",
                            "bookingDate": "2022-09-29",
                            "bookingDateTime": "2022-09-29T14:31:49.79Z",
                            "transactionAmount": {
                                "amount": "360.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "3dd58f14fb2e2a6a4de0a55c566dc7c1"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NTAyODM4Njc5",
                            "bookingDate": "2022-09-26",
                            "bookingDateTime": "2022-09-26T13:29:15.041Z",
                            "transactionAmount": {
                                "amount": "-170.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "56.9096",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "293b44dfc50ebf0a5ab75410ce728eb3"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NTAyODM2NzMz",
                            "bookingDate": "2022-09-26",
                            "bookingDateTime": "2022-09-26T13:26:26.442Z",
                            "transactionAmount": {
                                "amount": "170.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "bd7a4435c591b02be4003a3b1a46c4ff"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NTAyMDAwNDQy",
                            "bookingDate": "2022-09-25",
                            "bookingDateTime": "2022-09-25T07:49:18.007Z",
                            "transactionAmount": {
                                "amount": "-960.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "56.9288",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "ecda7796434a65e7c68040d4ec0466a1"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NTAyMDAwMDAz",
                            "bookingDate": "2022-09-25",
                            "bookingDateTime": "2022-09-25T07:46:26.414Z",
                            "transactionAmount": {
                                "amount": "960.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "b2092097582169dafb97a22ac0147b84"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NTAwMjE0MjIx",
                            "bookingDate": "2022-09-22",
                            "bookingDateTime": "2022-09-22T09:39:53.312Z",
                            "transactionAmount": {
                                "amount": "-45.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "57.6888",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "44bd371bd08afa278ee472c46d7a4b6c"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NTAwMjA1MzEz",
                            "bookingDate": "2022-09-22",
                            "bookingDateTime": "2022-09-22T09:30:46.788Z",
                            "transactionAmount": {
                                "amount": "45.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "f67e4c97d8aac1c8dfa86b058c011506"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDk5MTk1MjIz",
                            "bookingDate": "2022-09-20",
                            "bookingDateTime": "2022-09-20T21:00:14.68Z",
                            "transactionAmount": {
                                "amount": "-80.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "57.413",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "b0f207930b0bc6584514e7b25de39424"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDk5MTk0Njc0",
                            "bookingDate": "2022-09-20",
                            "bookingDateTime": "2022-09-20T20:58:19.503Z",
                            "transactionAmount": {
                                "amount": "80.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "5dc0394b79705ad7d02e7e0a83977b5e"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDk4NDg0MjY2",
                            "bookingDate": "2022-09-20",
                            "bookingDateTime": "2022-09-20T01:30:38.103Z",
                            "transactionAmount": {
                                "amount": "-230.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "57.5328",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "59732564750398cd9f5c15e6642344eb"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDk4NDgzOTQ5",
                            "bookingDate": "2022-09-19",
                            "bookingDateTime": "2022-09-19T23:20:16.411Z",
                            "transactionAmount": {
                                "amount": "230.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "1aa8138b0a40349ce96cf8c83928f943"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDk3MTExMzk0",
                            "bookingDate": "2022-09-17",
                            "bookingDateTime": "2022-09-17T10:32:36.576Z",
                            "transactionAmount": {
                                "amount": "-352.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "57.4368",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "d7f9e3681c3b9e40d2a9353775c819a8"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDk3MTEwNzc2",
                            "bookingDate": "2022-09-17",
                            "bookingDateTime": "2022-09-17T10:30:07.008Z",
                            "transactionAmount": {
                                "amount": "352.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "f3be9c2d655ffea33e571ef01d4dcb1b"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDk2OTEwNzgx",
                            "bookingDate": "2022-09-16",
                            "bookingDateTime": "2022-09-16T20:57:46.906Z",
                            "transactionAmount": {
                                "amount": "-200.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "57.431",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "5598a7a191c80e7f14c0e96f81353e2d"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDk2OTEwMDI4",
                            "bookingDate": "2022-09-16",
                            "bookingDateTime": "2022-09-16T20:55:21.276Z",
                            "transactionAmount": {
                                "amount": "200.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "95f8824805815505fc7f3ee3164cc6f4"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDk0NTQyMjkz",
                            "bookingDate": "2022-09-13",
                            "bookingDateTime": "2022-09-13T17:11:07.478Z",
                            "transactionAmount": {
                                "amount": "-110.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "57.0271",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "b11c44707bdcd7e2d2b1a09f9b9974fc"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDk0NTQxNjEx",
                            "bookingDate": "2022-09-13",
                            "bookingDateTime": "2022-09-13T17:09:15.947Z",
                            "transactionAmount": {
                                "amount": "110.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "4ed0c2da748ef4d67026ba18d4723481"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDg5NjQ2MDY0",
                            "bookingDate": "2022-09-06",
                            "bookingDateTime": "2022-09-06T12:59:19.728Z",
                            "transactionAmount": {
                                "amount": "-110.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "56.694",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "086257d63e063bd951840c53a91fba9e"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDg5NjI4NDU1",
                            "bookingDate": "2022-09-06",
                            "bookingDateTime": "2022-09-06T12:45:37.694Z",
                            "transactionAmount": {
                                "amount": "110.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "0d9213b488a927f0abd5436c8ffa01aa"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDg1NjMwNzc3",
                            "bookingDate": "2022-08-31",
                            "bookingDateTime": "2022-08-31T19:14:45.25Z",
                            "transactionAmount": {
                                "amount": "-610.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "56.5224",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "813e1f0c3ca606bfea7015bceb9d3be9"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDg1NjI5MTMw",
                            "bookingDate": "2022-08-31",
                            "bookingDateTime": "2022-08-31T19:11:58.996Z",
                            "transactionAmount": {
                                "amount": "610.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "82fe85ee395b9987c34fa837946cac21"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDg0NTM2NzY1",
                            "bookingDate": "2022-08-30",
                            "bookingDateTime": "2022-08-30T14:02:30.971Z",
                            "transactionAmount": {
                                "amount": "-30.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "56.3439",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "06a228a2c12b59980af59ea174cb22e6"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDg0NTM1NTI3",
                            "bookingDate": "2022-08-30",
                            "bookingDateTime": "2022-08-30T14:00:38.586Z",
                            "transactionAmount": {
                                "amount": "30.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "8f5a5aaf1f9e464a5ee9a8e1eda0b905"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDgxODY2Njkw",
                            "bookingDate": "2022-08-26",
                            "bookingDateTime": "2022-08-26T08:15:53.782Z",
                            "transactionAmount": {
                                "amount": "-50.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "55.893",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "ad2550fb12cf0b8361de459d66dbc048"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDgxODY1MzQx",
                            "bookingDate": "2022-08-26",
                            "bookingDateTime": "2022-08-26T08:14:03.05Z",
                            "transactionAmount": {
                                "amount": "50.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "a6a188ad817429dc906372f6f18c40ed"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDgwMzkxOTQ3",
                            "bookingDate": "2022-08-24",
                            "bookingDateTime": "2022-08-24T09:02:12.75Z",
                            "transactionAmount": {
                                "amount": "-300.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "55.784",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "07953c814d7e5a125cac994e5a4814e7"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDgwMzkwNTY0",
                            "bookingDate": "2022-08-24",
                            "bookingDateTime": "2022-08-24T07:23:00.194Z",
                            "transactionAmount": {
                                "amount": "300.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "5683991fb16a5b8425e150dad16f2d1f"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDc5NTA2NzI3",
                            "bookingDate": "2022-08-22",
                            "bookingDateTime": "2022-08-22T20:50:52.876Z",
                            "transactionAmount": {
                                "amount": "-60.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "55.8669",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "f1afe66d87a4eff7fc0f47a732faa4d6"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDc5NTA2MTIw",
                            "bookingDate": "2022-08-22",
                            "bookingDateTime": "2022-08-22T20:48:17.367Z",
                            "transactionAmount": {
                                "amount": "60.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "a755712ed6c3d14cf7b885ecfaaf7ffe"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDc4NDk5NTk4",
                            "bookingDate": "2022-08-21",
                            "bookingDateTime": "2022-08-21T07:55:38.902Z",
                            "transactionAmount": {
                                "amount": "-150.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "56.1626",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "b793338ec9bfbec72711d05e77d938e1"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDc4NDk5Mjg4",
                            "bookingDate": "2022-08-21",
                            "bookingDateTime": "2022-08-21T07:54:34.864Z",
                            "transactionAmount": {
                                "amount": "150.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "03ac3959f4a584f64ed56431ac023114"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDc1OTcxMDQ2",
                            "bookingDate": "2022-08-16",
                            "bookingDateTime": "2022-08-16T20:29:49.583Z",
                            "transactionAmount": {
                                "amount": "-1065.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "56.8244",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "e56506ba28217122f7d37d21eeb3a960"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDc1OTcwMzY5",
                            "bookingDate": "2022-08-16",
                            "bookingDateTime": "2022-08-16T20:28:08.586Z",
                            "transactionAmount": {
                                "amount": "1065.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "5b9d4dfc2e56d195affe8ceec314e9b7"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDczODg5NzI5",
                            "bookingDate": "2022-08-13",
                            "bookingDateTime": "2022-08-13T08:57:49.615Z",
                            "transactionAmount": {
                                "amount": "-250.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "57.1119",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "00e55e7fcb9ef2f6daf31e19065e7f13"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDczNzU1MjE3",
                            "bookingDate": "2022-08-12",
                            "bookingDateTime": "2022-08-12T22:27:23.47Z",
                            "transactionAmount": {
                                "amount": "250.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "80b410a905240971f9d0fde4e32cb5d9"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDczMzI4ODk5",
                            "bookingDate": "2022-08-12",
                            "bookingDateTime": "2022-08-12T10:14:18.28Z",
                            "transactionAmount": {
                                "amount": "-40.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "57.2853",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "5d3266b5041ba5810de205b76053a963"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDczMzI4MTAw",
                            "bookingDate": "2022-08-12",
                            "bookingDateTime": "2022-08-12T10:11:33.296Z",
                            "transactionAmount": {
                                "amount": "40.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "c520fe6cd17041701a283f16a08cae7b"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDY3NzYwNDg4",
                            "bookingDate": "2022-08-03",
                            "bookingDateTime": "2022-08-03T22:24:59.956Z",
                            "transactionAmount": {
                                "amount": "-19.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "56.6318",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "983c2b32e6ba5766ad955e7ec2d9adfe"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDY3NzU5OTY5",
                            "bookingDate": "2022-08-03",
                            "bookingDateTime": "2022-08-03T22:22:35.232Z",
                            "transactionAmount": {
                                "amount": "19.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "a3afdb7ed8c7d9a52df38a856d174189"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDY2NDEwMjIy",
                            "bookingDate": "2022-08-02",
                            "bookingDateTime": "2022-08-02T09:06:51.547Z",
                            "transactionAmount": {
                                "amount": "-556.64",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "56.8813",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "3217cef62398ac209e84c9467cf71924"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDY2NDAxMjI1",
                            "bookingDate": "2022-08-02",
                            "bookingDateTime": "2022-08-02T08:55:24.066Z",
                            "transactionAmount": {
                                "amount": "556.64",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "dcc4cde2354e5c87b81d60bac2a2eb55"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDY0Nzk0NzAz",
                            "bookingDate": "2022-07-31",
                            "bookingDateTime": "2022-07-31T08:26:00.082Z",
                            "transactionAmount": {
                                "amount": "-60.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "56.6167",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "86dfac8b6b395cf454a316f678a192f9"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDY0Nzk0MjY2",
                            "bookingDate": "2022-07-31",
                            "bookingDateTime": "2022-07-31T08:20:33.4Z",
                            "transactionAmount": {
                                "amount": "60.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "2c4c4e31bd4eae48e2f997a957847a61"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDYxNjk2MTMw",
                            "bookingDate": "2022-07-26",
                            "bookingDateTime": "2022-07-26T21:55:26.681Z",
                            "transactionAmount": {
                                "amount": "-375.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "56.0868",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "a4e10d54c045cf805d2103971ec3c22d"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDYxNjk1NjY0",
                            "bookingDate": "2022-07-26",
                            "bookingDateTime": "2022-07-26T21:53:50.384Z",
                            "transactionAmount": {
                                "amount": "375.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "982d96dde01893343e7e89485bd4de87"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDYwODk5NDU4",
                            "bookingDate": "2022-07-25",
                            "bookingDateTime": "2022-07-25T19:43:38.774Z",
                            "transactionAmount": {
                                "amount": "-1112.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "57.009",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "19d39092a34c6d8ecd1a9091cb0c5228"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDYwODk4NDgy",
                            "bookingDate": "2022-07-25",
                            "bookingDateTime": "2022-07-25T19:40:38.18Z",
                            "transactionAmount": {
                                "amount": "1112.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "5bba88b2537b0d89061ec77517b3ceda"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDU5NTYxNTg0",
                            "bookingDate": "2022-07-23",
                            "bookingDateTime": "2022-07-23T09:32:46.485Z",
                            "transactionAmount": {
                                "amount": "-190.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "57.321",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "28241ddc4e4b0043a80469985a5d65bd"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDU5NTYxMTk1",
                            "bookingDate": "2022-07-23",
                            "bookingDateTime": "2022-07-23T09:26:07.91Z",
                            "transactionAmount": {
                                "amount": "190.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "56695d1c1ae04f9a47feb76c882e41fc"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDU4MTc3MzYw",
                            "bookingDate": "2022-07-21",
                            "bookingDateTime": "2022-07-21T06:47:53.712Z",
                            "transactionAmount": {
                                "amount": "-88.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "57.5795",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "a8014b794c527d12ed41842421b1a5fa"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDU4MTY3NTA0",
                            "bookingDate": "2022-07-21",
                            "bookingDateTime": "2022-07-21T06:22:06.458Z",
                            "transactionAmount": {
                                "amount": "88.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "07ac1e772a7008dd045e82e3dc8eaca5"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDU1NzI5NTQ1",
                            "bookingDate": "2022-07-17",
                            "bookingDateTime": "2022-07-17T14:14:04.519Z",
                            "transactionAmount": {
                                "amount": "-300.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "56.7854",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "a3fc58dba58aac9c1ea7b3484e3cbf53"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDU1NzI4NjE4",
                            "bookingDate": "2022-07-17",
                            "bookingDateTime": "2022-07-17T14:08:28.536Z",
                            "transactionAmount": {
                                "amount": "300.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "9c19b01ce92bf02125326ad657c62965"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDUzMTgxOTgz",
                            "bookingDate": "2022-07-13",
                            "bookingDateTime": "2022-07-13T06:34:56.577Z",
                            "transactionAmount": {
                                "amount": "-550.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "56.6071",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "64fe1b22c1bbee7aa9a44de4b7bc16f3"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDUzMTgxNDM4",
                            "bookingDate": "2022-07-13",
                            "bookingDateTime": "2022-07-13T06:31:13.56Z",
                            "transactionAmount": {
                                "amount": "550.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "f949d10f6c7918f32da9e5491d1f1c07"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDUyODU0MTIx",
                            "bookingDate": "2022-07-12",
                            "bookingDateTime": "2022-07-12T15:24:10.869Z",
                            "transactionAmount": {
                                "amount": "-17.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "56.633",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "4476d7230585d01ac2edb1d4a17676de"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDUyODUzMjMz",
                            "bookingDate": "2022-07-12",
                            "bookingDateTime": "2022-07-12T14:52:23.099Z",
                            "transactionAmount": {
                                "amount": "17.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "78e503d4c22a00eba8dcccdeb5cfd73c"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDUxNDMwODE3",
                            "bookingDate": "2022-07-10",
                            "bookingDateTime": "2022-07-10T11:02:32.918Z",
                            "transactionAmount": {
                                "amount": "-90.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "56.8684",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "d92e5247c6233fc2bd5a6525a002b79a"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDUxNDMwMzI0",
                            "bookingDate": "2022-07-10",
                            "bookingDateTime": "2022-07-10T11:00:07.766Z",
                            "transactionAmount": {
                                "amount": "90.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "845990ca35959cdc8dd4c3c48e851e4a"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDUxMDY2NzM5",
                            "bookingDate": "2022-07-09",
                            "bookingDateTime": "2022-07-09T10:26:26.564Z",
                            "transactionAmount": {
                                "amount": "-130.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "56.8684",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "46750e03ce86683075a3f9ce8cd9d6b2"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDUxMDY2MzA2",
                            "bookingDate": "2022-07-09",
                            "bookingDateTime": "2022-07-09T10:22:58.53Z",
                            "transactionAmount": {
                                "amount": "130.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "b5d20ff8ee15a5d07a982b6a4529e395"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDUxMDExMDg2",
                            "bookingDate": "2022-07-09",
                            "bookingDateTime": "2022-07-09T07:40:28.586Z",
                            "transactionAmount": {
                                "amount": "-46.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "56.8684",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "ffa66a4ce7f2d5329d9f29594ff9b446"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDUxMDEwNzMy",
                            "bookingDate": "2022-07-09",
                            "bookingDateTime": "2022-07-09T07:37:05.627Z",
                            "transactionAmount": {
                                "amount": "46.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "ef5f059bb9cde331dec9e0e675f05d54"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDQ4ODI4MDA4",
                            "bookingDate": "2022-07-06",
                            "bookingDateTime": "2022-07-06T07:25:24.362Z",
                            "transactionAmount": {
                                "amount": "-80.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "57.0969",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "c4a5a3234bf1583b0b9abe57e5227340"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDQ4ODA3MTY3",
                            "bookingDate": "2022-07-06",
                            "bookingDateTime": "2022-07-06T06:58:32.475Z",
                            "transactionAmount": {
                                "amount": "80.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "8ea1128c7058351f1b30e810f830ffcd"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDQ2OTgwMzc5",
                            "bookingDate": "2022-07-06",
                            "bookingDateTime": "2022-07-06T04:13:53.863Z",
                            "transactionAmount": {
                                "amount": "-10.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "57.4813",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "d11e58b4e710bd1a642b6d846e9a9aff"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDQ2OTc5Njc3",
                            "bookingDate": "2022-07-03",
                            "bookingDateTime": "2022-07-03T19:35:04.465Z",
                            "transactionAmount": {
                                "amount": "10.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "70703086024cfd4bd2010d2cf308dd5d"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDQ2OTc5NDc1",
                            "bookingDate": "2022-07-03",
                            "bookingDateTime": "2022-07-03T19:34:04.016Z",
                            "transactionAmount": {
                                "amount": "-445.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "57.4813",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "b35298efe174fb7eb01d1064abf90ed3"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDQ2OTc4ODk2",
                            "bookingDate": "2022-07-03",
                            "bookingDateTime": "2022-07-03T19:31:56.572Z",
                            "transactionAmount": {
                                "amount": "445.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "e2b7adbb887d10b73e1e3e498899728e"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDQzOTcyOTU3",
                            "bookingDate": "2022-06-29",
                            "bookingDateTime": "2022-06-29T10:02:00.63Z",
                            "transactionAmount": {
                                "amount": "-217.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "57.795",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "94247b37de61117e551336aad5dd535f"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDQzOTcyMDk4",
                            "bookingDate": "2022-06-29",
                            "bookingDateTime": "2022-06-29T09:59:25.854Z",
                            "transactionAmount": {
                                "amount": "217.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "424a2085310b2d4919ce8f9817959193"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDQxOTU2MjI1",
                            "bookingDate": "2022-06-26",
                            "bookingDateTime": "2022-06-26T10:07:39.966Z",
                            "transactionAmount": {
                                "amount": "-850.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "57.9524",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "f4d7453aaab6a0b49e946ec423920f5d"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDQxOTU1Njkw",
                            "bookingDate": "2022-06-26",
                            "bookingDateTime": "2022-06-26T10:02:49.412Z",
                            "transactionAmount": {
                                "amount": "850.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "fcfa6ba62ea298e9c262b4a2647b4743"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDQwOTg3MTc1",
                            "bookingDate": "2022-06-24",
                            "bookingDateTime": "2022-06-24T08:33:52.171Z",
                            "transactionAmount": {
                                "amount": "-120.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "57.8399",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "59f70a48cb460cfa770452b807f282f2"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDQwOTg1Nzc5",
                            "bookingDate": "2022-06-24",
                            "bookingDateTime": "2022-06-24T08:28:47.478Z",
                            "transactionAmount": {
                                "amount": "120.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "3cda724a6a5d9c5f2140839b6c4cf2f4"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDQwNDAxMzUw",
                            "bookingDate": "2022-06-23",
                            "bookingDateTime": "2022-06-23T10:53:44.265Z",
                            "transactionAmount": {
                                "amount": "-180.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "57.4306",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "ded51f5989cca7063d90bd30e80d0978"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDQwNDAwNTQz",
                            "bookingDate": "2022-06-23",
                            "bookingDateTime": "2022-06-23T10:52:17.817Z",
                            "transactionAmount": {
                                "amount": "180.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "030a7b2be89943edb9e222c7fb2435b8"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDM5NDAxNzA3",
                            "bookingDate": "2022-06-21",
                            "bookingDateTime": "2022-06-21T19:35:52.762Z",
                            "transactionAmount": {
                                "amount": "-270.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "57.197",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "1b1a4345e4578d9c0c68a00a28e49d1a"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDM5Mzk5NDk0",
                            "bookingDate": "2022-06-21",
                            "bookingDateTime": "2022-06-21T19:32:08.799Z",
                            "transactionAmount": {
                                "amount": "270.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "8d5d82c00abf2a280120efe977d3221d"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDM4MDQxMjEz",
                            "bookingDate": "2022-06-19",
                            "bookingDateTime": "2022-06-19T19:35:32.375Z",
                            "transactionAmount": {
                                "amount": "-80.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "56.4211",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "f51d028a26054e5fb01a0eaf8bb4674e"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDM4MDQwNzQw",
                            "bookingDate": "2022-06-19",
                            "bookingDateTime": "2022-06-19T19:34:15.555Z",
                            "transactionAmount": {
                                "amount": "80.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "10625e644d3fcd1af93dace5b877f477"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDM3NTA3ODEw",
                            "bookingDate": "2022-06-18",
                            "bookingDateTime": "2022-06-18T09:51:57.753Z",
                            "transactionAmount": {
                                "amount": "-100.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "56.4211",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "c26e72a3bf41b65c8794bf47b76d770b"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDM3NTA3MDY5",
                            "bookingDate": "2022-06-18",
                            "bookingDateTime": "2022-06-18T09:48:02.846Z",
                            "transactionAmount": {
                                "amount": "100.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "08c900f68fe8a0ca3a9f7c45d30320de"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDM3MjU0MTMy",
                            "bookingDate": "2022-06-17",
                            "bookingDateTime": "2022-06-17T17:26:44.246Z",
                            "transactionAmount": {
                                "amount": "-70.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "56.2773",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "51fdcbd6cf6c44eeeb64b50f38719dae"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDM3MjUzNTgw",
                            "bookingDate": "2022-06-17",
                            "bookingDateTime": "2022-06-17T17:25:29.056Z",
                            "transactionAmount": {
                                "amount": "70.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "da13ca8e4c81e7a08a653dffb44376c0"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDM2OTY4MzUw",
                            "bookingDate": "2022-06-17",
                            "bookingDateTime": "2022-06-17T10:03:01.387Z",
                            "transactionAmount": {
                                "amount": "-60.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "56.549",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "7add5d17796b2f6e8c654473363bb082"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDM2OTY3MTk2",
                            "bookingDate": "2022-06-17",
                            "bookingDateTime": "2022-06-17T10:00:00.185Z",
                            "transactionAmount": {
                                "amount": "60.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "0002d20eb3719dd511035f8d8581119b"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDM2Njk2NDk2",
                            "bookingDate": "2022-06-16",
                            "bookingDateTime": "2022-06-16T22:23:31.612Z",
                            "transactionAmount": {
                                "amount": "-130.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "56.4535",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "1fa91b4f7f03e5f15c9a8180cfcbf662"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDM2Njk2MDg4",
                            "bookingDate": "2022-06-16",
                            "bookingDateTime": "2022-06-16T22:20:31.839Z",
                            "transactionAmount": {
                                "amount": "130.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "ed86fea88efc69e481494ef00ea89dcc"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDM1NDM4MDUz",
                            "bookingDate": "2022-06-15",
                            "bookingDateTime": "2022-06-15T06:05:55.131Z",
                            "transactionAmount": {
                                "amount": "-100.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "55.8334",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "2d6c7bf5b5448b19ba2f9ee6d6abcfc8"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDM1NDM2ODQ4",
                            "bookingDate": "2022-06-15",
                            "bookingDateTime": "2022-06-15T06:02:11.424Z",
                            "transactionAmount": {
                                "amount": "100.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "c65c8c4f0d15430b79d0defa3782e16f"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDM1MTQ5NzA5",
                            "bookingDate": "2022-06-14",
                            "bookingDateTime": "2022-06-14T16:26:19.626Z",
                            "transactionAmount": {
                                "amount": "-110.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "55.5154",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "99b7b1f7755c1e17c12739bef78c220a"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDM1MTQ4NTky",
                            "bookingDate": "2022-06-14",
                            "bookingDateTime": "2022-06-14T16:19:11.098Z",
                            "transactionAmount": {
                                "amount": "110.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "4f3916fad5fd38f6818f1dc07c9dd2c2"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDMzMjI5NDgx",
                            "bookingDate": "2022-06-11",
                            "bookingDateTime": "2022-06-11T04:22:41.554Z",
                            "transactionAmount": {
                                "amount": "-68.40",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "55.8085",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "07222ee9e23bf0ea5524d2b9b41ed3c2"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDMzMjI5MjYx",
                            "bookingDate": "2022-06-11",
                            "bookingDateTime": "2022-06-11T04:21:23.701Z",
                            "transactionAmount": {
                                "amount": "68.40",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "849f3c9d3d27836caf49911daedfa70a"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDMyMjU5Mzg4",
                            "bookingDate": "2022-06-09",
                            "bookingDateTime": "2022-06-09T14:52:00.486Z",
                            "transactionAmount": {
                                "amount": "-200.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "56.4597",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "441427cec2b0c55e2eb2c542f45f6951"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDMyMjU4MzM3",
                            "bookingDate": "2022-06-09",
                            "bookingDateTime": "2022-06-09T14:48:56.659Z",
                            "transactionAmount": {
                                "amount": "200.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "d8623798f9257f382b7d0182888be34d"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDMxMjQzNjgx",
                            "bookingDate": "2022-06-08",
                            "bookingDateTime": "2022-06-08T07:03:56.423Z",
                            "transactionAmount": {
                                "amount": "-200.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "56.513",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "ea1db252112bf4d80c63286662da5006"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDMxMjQyOTk4",
                            "bookingDate": "2022-06-08",
                            "bookingDateTime": "2022-06-08T07:01:34.088Z",
                            "transactionAmount": {
                                "amount": "200.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "2fc1cf32bd0357e6884df284f43c8fea"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDMwOTQwMjMz",
                            "bookingDate": "2022-06-07",
                            "bookingDateTime": "2022-06-07T16:53:48.062Z",
                            "transactionAmount": {
                                "amount": "-100.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "56.5335",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "795898c93f6e03cdc08fb459849d528f"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDMwOTM5MTY5",
                            "bookingDate": "2022-06-07",
                            "bookingDateTime": "2022-06-07T16:50:57.244Z",
                            "transactionAmount": {
                                "amount": "100.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "3a9a241f1bb3c99002b7cdf37eaaafee"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDI4ODU0NTYw",
                            "bookingDate": "2022-06-04",
                            "bookingDateTime": "2022-06-04T01:33:59.7Z",
                            "transactionAmount": {
                                "amount": "-103.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "56.7116",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "3584cc54681313cef87983c6ebd0cd0b"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDI4ODU0MTkw",
                            "bookingDate": "2022-06-03",
                            "bookingDateTime": "2022-06-03T23:39:39.487Z",
                            "transactionAmount": {
                                "amount": "100.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "d50fb91ab3ff76d5cd890220f071ba0f"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpDQVJEX09SREVSOjozMDAwNzEx",
                            "bookingDate": "2022-06-01",
                            "bookingDateTime": "2022-06-01T11:53:29.549Z",
                            "transactionAmount": {
                                "amount": "-7.00",
                                "currency": "EUR"
                            },
                            "creditorName": "TransferWise",
                            "remittanceInformationUnstructured": "Paid For your Wise card",
                            "additionalInformation": "3000711",
                            "proprietaryBankTransactionCode": "CARD_ORDER",
                            "internalTransactionId": "23c448ec190ab4d6e8f6348981d83a6c"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDI2OTY0OTk2",
                            "bookingDate": "2022-06-01",
                            "bookingDateTime": "2022-06-01T11:47:01Z",
                            "transactionAmount": {
                                "amount": "10.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "b3a39f0245cbf713e33de8dabaec9a1e"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDI2ODczOTMz",
                            "bookingDate": "2022-06-01",
                            "bookingDateTime": "2022-06-01T10:07:26Z",
                            "transactionAmount": {
                                "amount": "-375.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "56.2426",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "47b0235176f4dccaaf57f2544d67cdb9"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDI2ODcwMzYx",
                            "bookingDate": "2022-06-01",
                            "bookingDateTime": "2022-06-01T10:01:49Z",
                            "transactionAmount": {
                                "amount": "375.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "894a37a125ff380bd9131a6fc59f9816"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDI1NzM5OTEy",
                            "bookingDate": "2022-05-31",
                            "bookingDateTime": "2022-05-31T04:39:07Z",
                            "transactionAmount": {
                                "amount": "-12.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "56.3359",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Golden Harvest Distribution ",
                            "creditorAccount": {
                                "bban": "003130382032"
                            },
                            "remittanceInformationUnstructured": "Sent Golden Harvest Distribution ",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "4a90820445116c32ea7d27583c09427d"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDI1NzQwNzAx",
                            "bookingDate": "2022-05-31",
                            "bookingDateTime": "2022-05-31T04:39:07Z",
                            "transactionAmount": {
                                "amount": "-10.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "56.3411",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "be3e0062b87a3e873cab58a93da943c8"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDI1NzQwMzUy",
                            "bookingDate": "2022-05-31",
                            "bookingDateTime": "2022-05-31T04:37:24Z",
                            "transactionAmount": {
                                "amount": "10.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "e0dcd2b1629efd1b0677d73e3e9d3da6"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDI1NzM5NDg2",
                            "bookingDate": "2022-05-31",
                            "bookingDateTime": "2022-05-31T04:34:11Z",
                            "transactionAmount": {
                                "amount": "12.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "7c8e05e4eed5d41d1474ace4616211f8"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDI0MTU3MDY3",
                            "bookingDate": "2022-05-28",
                            "bookingDateTime": "2022-05-28T08:52:44Z",
                            "transactionAmount": {
                                "amount": "-435.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "56.0718",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "f4fb5ef9e6bdf3c3c0b2815be24a83dd"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDI0MTU2NDIw",
                            "bookingDate": "2022-05-28",
                            "bookingDateTime": "2022-05-28T08:49:35Z",
                            "transactionAmount": {
                                "amount": "5.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "9d2dedd178a168057cb1fa424c73a6d1"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDI0MTU1NzI2",
                            "bookingDate": "2022-05-28",
                            "bookingDateTime": "2022-05-28T08:47:48Z",
                            "transactionAmount": {
                                "amount": "430.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "d8149d3ab18e2fc81020670d0620e77b"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDIzMzY4ODc1",
                            "bookingDate": "2022-05-27",
                            "bookingDateTime": "2022-05-27T05:58:36Z",
                            "transactionAmount": {
                                "amount": "-100.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "56.1826",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "911ec799b0d14b6a0622c6c4c9ea1058"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDIzMzY3NTg1",
                            "bookingDate": "2022-05-27",
                            "bookingDateTime": "2022-05-27T05:55:23Z",
                            "transactionAmount": {
                                "amount": "100.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "05f690ddbe1670a9388e836562551a3a"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDIyMjk2ODQ5",
                            "bookingDate": "2022-05-25",
                            "bookingDateTime": "2022-05-25T14:16:26Z",
                            "transactionAmount": {
                                "amount": "-190.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "55.8077",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "713dde0ea9c8513a69af090cbaa62a8e"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDIyMjk1Mjc2",
                            "bookingDate": "2022-05-25",
                            "bookingDateTime": "2022-05-25T13:57:26Z",
                            "transactionAmount": {
                                "amount": "190.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "a902b87b9e6c0f765e415e33223110de"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDIxOTgxNDQ5",
                            "bookingDate": "2022-05-25",
                            "bookingDateTime": "2022-05-25T06:17:19Z",
                            "transactionAmount": {
                                "amount": "-90.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "56.0169",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "e7fc00ce6b6d5bb1ac783359fa209bf8"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDIxOTgwNjE2",
                            "bookingDate": "2022-05-25",
                            "bookingDateTime": "2022-05-25T06:12:55Z",
                            "transactionAmount": {
                                "amount": "90.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "2c3cbe4af188a793481fae6b063272e5"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDIwMzU4OTkw",
                            "bookingDate": "2022-05-22",
                            "bookingDateTime": "2022-05-22T22:12:20.949Z",
                            "transactionAmount": {
                                "amount": "-58.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "55.1914",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "195382b66d5f623e1d143d8434b7b564"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDIwMzU4NTcy",
                            "bookingDate": "2022-05-22",
                            "bookingDateTime": "2022-05-22T22:06:51.726Z",
                            "transactionAmount": {
                                "amount": "58.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "859663825533a9c024e4ffbe73344586"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDE4MzYxMzY0",
                            "bookingDate": "2022-05-19",
                            "bookingDateTime": "2022-05-19T07:21:13.145Z",
                            "transactionAmount": {
                                "amount": "-70.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "54.8575",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "422790db08f1c03a219d3a6b599215dd"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDE4MzYwNzk2",
                            "bookingDate": "2022-05-19",
                            "bookingDateTime": "2022-05-19T07:17:34.752Z",
                            "transactionAmount": {
                                "amount": "70.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "9f15d1f72ffca1ae9d87e8d96bfb3da2"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDE1NjQ2MzQ0",
                            "bookingDate": "2022-05-14",
                            "bookingDateTime": "2022-05-14T11:33:07.038Z",
                            "transactionAmount": {
                                "amount": "-850.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "54.5145",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "0bd81433a22ae8de615255e97b5bce2d"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDE1NjQ1ODc3",
                            "bookingDate": "2022-05-14",
                            "bookingDateTime": "2022-05-14T11:29:12.897Z",
                            "transactionAmount": {
                                "amount": "850.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "6faec8040077a715041dcbfdeae46edd"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDE0MzQ1NzE2",
                            "bookingDate": "2022-05-12",
                            "bookingDateTime": "2022-05-12T08:54:48.885Z",
                            "transactionAmount": {
                                "amount": "-160.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "54.9045",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "45708c93f5a11dbebc261245161b5ce1"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDE0MzQ0ODQ3",
                            "bookingDate": "2022-05-12",
                            "bookingDateTime": "2022-05-12T08:51:13.966Z",
                            "transactionAmount": {
                                "amount": "160.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "9883f947881e7ce7ddb5e5af325f97a4"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDEyMjA3NzQz",
                            "bookingDate": "2022-05-09",
                            "bookingDateTime": "2022-05-09T07:30:49.435Z",
                            "transactionAmount": {
                                "amount": "-50.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "55.3719",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "ef440f5c38208294b59bc755e77c0813"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDEyMjA3MDQ4",
                            "bookingDate": "2022-05-09",
                            "bookingDateTime": "2022-05-09T07:25:32.615Z",
                            "transactionAmount": {
                                "amount": "50.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "28e2ad89ac2208d48f14dc1e92b0a09a"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDExODIwNDUw",
                            "bookingDate": "2022-05-08",
                            "bookingDateTime": "2022-05-08T09:40:46.333Z",
                            "transactionAmount": {
                                "amount": "-250.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "55.2821",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "60f38c2737e6ca3150b085930e138091"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDExODE5OTQ1",
                            "bookingDate": "2022-05-08",
                            "bookingDateTime": "2022-05-08T09:38:04.371Z",
                            "transactionAmount": {
                                "amount": "250.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "24e52875bd823f5b44bd6b99ac659bb9"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDExMzUxNjk1",
                            "bookingDate": "2022-05-07",
                            "bookingDateTime": "2022-05-07T01:31:31.559Z",
                            "transactionAmount": {
                                "amount": "-172.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "55.2821",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "7a0d57dc39ffd5c4dc8f33c4cc9b9a1d"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDExMzUxNDkw",
                            "bookingDate": "2022-05-06",
                            "bookingDateTime": "2022-05-06T23:59:37.306Z",
                            "transactionAmount": {
                                "amount": "172.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "da09e57461dc1049d04e25e2c0d2806b"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDEwMzc3NzM3",
                            "bookingDate": "2022-05-05",
                            "bookingDateTime": "2022-05-05T14:10:15.763Z",
                            "transactionAmount": {
                                "amount": "-100.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "55.3596",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "405f915138119ae9647558affa1723e3"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDEwMzc2MTQ3",
                            "bookingDate": "2022-05-05",
                            "bookingDateTime": "2022-05-05T14:06:17.12Z",
                            "transactionAmount": {
                                "amount": "100.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "ce48f00d987d1afe2f51215a9eb4065b"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDA5MTg0OTk3",
                            "bookingDate": "2022-05-03",
                            "bookingDateTime": "2022-05-03T19:48:58.352Z",
                            "transactionAmount": {
                                "amount": "-190.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "55.2589",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "4942b656cb27dd641befe9c12e4428ad"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDA5MTgyMzY1",
                            "bookingDate": "2022-05-03",
                            "bookingDateTime": "2022-05-03T19:35:58.3Z",
                            "transactionAmount": {
                                "amount": "190.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "57fdc56a1bccc99809b1a40f4fcbc72b"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDA4MTEwMTc2",
                            "bookingDate": "2022-05-02",
                            "bookingDateTime": "2022-05-02T11:21:43.343Z",
                            "transactionAmount": {
                                "amount": "-20.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "55.1426",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "7eff15b8677992faac386974303b4af3"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDA4MTA4OTE2",
                            "bookingDate": "2022-05-02",
                            "bookingDateTime": "2022-05-02T11:03:10.387Z",
                            "transactionAmount": {
                                "amount": "20.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "7820eeb2fc5b1728169ac11ef83a0384"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDA3MDc4NzQy",
                            "bookingDate": "2022-04-30",
                            "bookingDateTime": "2022-04-30T10:23:10.797Z",
                            "transactionAmount": {
                                "amount": "-330.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "55.1714",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "c63428b0f0083499e234f0fc74f30253"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDA3MDc4MjU3",
                            "bookingDate": "2022-04-30",
                            "bookingDateTime": "2022-04-30T10:15:44.233Z",
                            "transactionAmount": {
                                "amount": "330.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "caf093905efbcc3397295dd74ce0482c"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDA3MDIwODU4",
                            "bookingDate": "2022-04-30",
                            "bookingDateTime": "2022-04-30T07:54:42.309Z",
                            "transactionAmount": {
                                "amount": "-10.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "55.1714",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "481ed060146803dfc0d6e0b5f3d57463"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDA3MDIwMzY3",
                            "bookingDate": "2022-04-30",
                            "bookingDateTime": "2022-04-30T07:44:51.398Z",
                            "transactionAmount": {
                                "amount": "10.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "e4dd810b0d26dd87c75dea7c8ca211b2"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDA2OTkwODMy",
                            "bookingDate": "2022-04-30",
                            "bookingDateTime": "2022-04-30T06:14:11.454Z",
                            "transactionAmount": {
                                "amount": "-15.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "55.1714",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Golden Harvest Distribution ",
                            "creditorAccount": {
                                "bban": "003130382032"
                            },
                            "remittanceInformationUnstructured": "Sent Golden Harvest Distribution ",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "33a7d468aee022320974f3d6b4288560"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDA2OTkwNDM0",
                            "bookingDate": "2022-04-30",
                            "bookingDateTime": "2022-04-30T06:03:36.409Z",
                            "transactionAmount": {
                                "amount": "15.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "897c285227797045b28f36a14db73cc3"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDA0OTQ3NDc0",
                            "bookingDate": "2022-04-27",
                            "bookingDateTime": "2022-04-27T19:04:10.856Z",
                            "transactionAmount": {
                                "amount": "-1200.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "55.0703",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "aefb3aaca4be8c178d29c51ae92ecb47"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDA0NzgzMDAx",
                            "bookingDate": "2022-04-27",
                            "bookingDateTime": "2022-04-27T14:15:10.158Z",
                            "transactionAmount": {
                                "amount": "1200.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "6ce8e3374327ddd06f5ed85cfc03913d"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDAwNTAzNDE1",
                            "bookingDate": "2022-04-20",
                            "bookingDateTime": "2022-04-20T08:01:04.32Z",
                            "transactionAmount": {
                                "amount": "-280.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "56.731",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "7482a0ddc29eb5ba520b59024e46a03e"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6NDAwNTAyMTIw",
                            "bookingDate": "2022-04-20",
                            "bookingDateTime": "2022-04-20T07:59:14.056Z",
                            "transactionAmount": {
                                "amount": "280.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "6618244d95c0da292b85fe0fcd7f6882"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6Mzk4NDAzMTcy",
                            "bookingDate": "2022-04-16",
                            "bookingDateTime": "2022-04-16T10:19:01.443Z",
                            "transactionAmount": {
                                "amount": "-50.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "56.4377",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "672ad2ba71a835a3c8437f8c27d8a833"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6Mzk4NDAyNzgx",
                            "bookingDate": "2022-04-16",
                            "bookingDateTime": "2022-04-16T10:10:28.366Z",
                            "transactionAmount": {
                                "amount": "50.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "56ea18c3dff968d5a86f5d3b8f8b6953"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6Mzk2NjU1Nzgx",
                            "bookingDate": "2022-04-13",
                            "bookingDateTime": "2022-04-13T09:56:55.739Z",
                            "transactionAmount": {
                                "amount": "-900.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "56.4219",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "798b0df7ff86c0cf1086d536312c0659"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6Mzk2NjU0Njc4",
                            "bookingDate": "2022-04-13",
                            "bookingDateTime": "2022-04-13T09:54:07.793Z",
                            "transactionAmount": {
                                "amount": "900.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "6d98be7d197a4dbc332829c44e7baf91"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6Mzk1NDY1OTMz",
                            "bookingDate": "2022-04-11",
                            "bookingDateTime": "2022-04-11T13:36:26.061Z",
                            "transactionAmount": {
                                "amount": "-80.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "56.7249",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "17a4d88cab56d2db811924b2e5f4f20c"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6Mzk1NDY0OTM2",
                            "bookingDate": "2022-04-11",
                            "bookingDateTime": "2022-04-11T13:25:55.325Z",
                            "transactionAmount": {
                                "amount": "80.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "bd360e3181f63a57221d448d4cb641fd"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6Mzk0NzA5OTk0",
                            "bookingDate": "2022-04-09",
                            "bookingDateTime": "2022-04-09T23:01:32.108Z",
                            "transactionAmount": {
                                "amount": "-20.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "56.1202",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "062e4dbfeae73ae6f1a0d3e7e037c1c8"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6Mzk0NzA5NzY2",
                            "bookingDate": "2022-04-09",
                            "bookingDateTime": "2022-04-09T22:51:51.605Z",
                            "transactionAmount": {
                                "amount": "20.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "036f73d5fd0dcb5046ff5ebfdb11991b"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6MzkyNTkzNjY5",
                            "bookingDate": "2022-04-06",
                            "bookingDateTime": "2022-04-06T08:54:52.253Z",
                            "transactionAmount": {
                                "amount": "-100.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "56.0858",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "595b894919a06ac5fc5a8fee0c8b280a"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6MzkyNTkyOTA3",
                            "bookingDate": "2022-04-06",
                            "bookingDateTime": "2022-04-06T08:43:54.335Z",
                            "transactionAmount": {
                                "amount": "100.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "bb6c79d7ab1d81eabf9bf5cb0ef28647"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6MzkwMzM4MjUw",
                            "bookingDate": "2022-04-02",
                            "bookingDateTime": "2022-04-02T09:54:36.435Z",
                            "transactionAmount": {
                                "amount": "-90.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "56.9355",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "74a8e9fecc862c838838735de7986c3b"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6MzkwMzM3NzQ3",
                            "bookingDate": "2022-04-02",
                            "bookingDateTime": "2022-04-02T09:45:14.055Z",
                            "transactionAmount": {
                                "amount": "50.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "0111f97d4449ad2ee2bd1541f64ca14a"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6Mzg5NDM3NjQy",
                            "bookingDate": "2022-04-01",
                            "bookingDateTime": "2022-04-01T01:38:06.461Z",
                            "transactionAmount": {
                                "amount": "-10.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "57.2489",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Golden Harvest Distribution ",
                            "creditorAccount": {
                                "bban": "003130382032"
                            },
                            "remittanceInformationUnstructured": "Sent Golden Harvest Distribution ",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "5335ccad58c065d38747332c95e32432"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6Mzg5NDM3Mjc0",
                            "bookingDate": "2022-04-01",
                            "bookingDateTime": "2022-04-01T00:17:20.431Z",
                            "transactionAmount": {
                                "amount": "50.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "80853657f00473796bff772b0514c79e"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6Mzg4MTI0ODI0",
                            "bookingDate": "2022-03-30",
                            "bookingDateTime": "2022-03-30T06:03:42.664Z",
                            "transactionAmount": {
                                "amount": "-850.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "57.7276",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "012363c81852f58b4ce0e14367e9bf26"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6Mzg3OTkwNTU2",
                            "bookingDate": "2022-03-29",
                            "bookingDateTime": "2022-03-29T20:47:55.382Z",
                            "transactionAmount": {
                                "amount": "850.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "b8efd61ccabe870dc74b01d4532b9add"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6Mzg2NDU2NzA3",
                            "bookingDate": "2022-03-27",
                            "bookingDateTime": "2022-03-27T07:34:44.283Z",
                            "transactionAmount": {
                                "amount": "-50.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "57.2402",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "525605c5fdee9a3c50d1abc47c0e555d"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6Mzg2NDU2NDc0",
                            "bookingDate": "2022-03-27",
                            "bookingDateTime": "2022-03-27T07:31:20.247Z",
                            "transactionAmount": {
                                "amount": "50.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "f73db49aa33380f4ee255128d78d27b4"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6Mzg1MTMzNzg5",
                            "bookingDate": "2022-03-24",
                            "bookingDateTime": "2022-03-24T12:25:05.41Z",
                            "transactionAmount": {
                                "amount": "-100.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "57.4191",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "9464d16e9123afd7d3a3d07e4ea87487"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6Mzg1MTMzMjI4",
                            "bookingDate": "2022-03-24",
                            "bookingDateTime": "2022-03-24T12:23:13.575Z",
                            "transactionAmount": {
                                "amount": "100.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "60a4deea279cf665eebedcc44dcddc36"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6MzgzMzAyMDE5",
                            "bookingDate": "2022-03-21",
                            "bookingDateTime": "2022-03-21T11:44:47.274Z",
                            "transactionAmount": {
                                "amount": "-87.00",
                                "currency": "EUR"
                            },
                            "currencyExchange": {
                                "sourceCurrency": "EUR",
                                "exchangeRate": "57.7966",
                                "targetCurrency": "PHP"
                            },
                            "creditorName": "Destined **8923** Verdadero Espiritu",
                            "creditorAccount": {
                                "bban": "003130333872"
                            },
                            "remittanceInformationUnstructured": "Sent Destined **8923** Verdadero Espiritu",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "24bd2abd17effa2a4f1f71f88e700836"
                        },
                        {
                            "transactionId": "12772791.TU9ORVRBUllfQUNUSVZJVFk6OjE0OTc1ODUyOjpUUkFOU0ZFUjo6MzgzMzAxMzIw",
                            "bookingDate": "2022-03-21",
                            "bookingDateTime": "2022-03-21T11:33:43.898Z",
                            "transactionAmount": {
                                "amount": "87.00",
                                "currency": "EUR"
                            },
                            "debtorName": "**9b316d987ea9d**",
                            "remittanceInformationUnstructured": "Added To your EUR balance",
                            "proprietaryBankTransactionCode": "TRANSFER",
                            "internalTransactionId": "8edac815f7dee4eba6f2050c84b5c20d"
                        }
                    ],
                    "pending": []
                },
                "account": {
                    "resourceId": "12772791",
                    "iban": "**a6106a7f30f2**",
                    "currency": "EUR",
                    "ownerName": "**9b316d987ea9d**",
                    "cashAccountType": "OTHR",
                    "details": "EUR"
                },
                "balances": [
                    {
                        "balanceAmount": {
                            "amount": "0.00",
                            "currency": "EUR"
                        },
                        "balanceType": "interimAvailable",
                        "referenceDate": "2023-03-16"
                    }
                ]
            }
        ]
    }
    
    data = filterData(data)
    data = filterOutgoingTransactions(data)
    data = sortTransactionsByCreditor(data)
    data = filterRepeatingAmount(data)
    data = filterMonthlyTransaction(data)
    console.log(data)
    return data;
}

export default dataSorter;

