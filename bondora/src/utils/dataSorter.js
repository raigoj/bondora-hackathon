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
            if (transactions[i].transactionAmount.amount < amount+ 10 && transactions[i].transactionAmount.amount > amount - 10) {
                // 
                return true
            }
        }
        return false
    })
}

function filterMonthly(creditors) {
    let returnValue = {}
    for (const key of Object.keys(creditors)) {
        creditors[key] = filterMonthlyTransaction(creditors[key])
    }

    for (const [key, value] of Object.entries(creditors)) {
        if (value.length > 1) {
            returnValue[key] = value
        }
    }
    
    return returnValue
}

function filterMonthlyTransaction(transactions) {
    
    let arr = []
    // console.log(arr)
    for (let i = 0; i < transactions.length; i++) {
        let transaction = transactions[i];
        let date1 = new Date(transaction.bookingDate)
        if (arr.length == 0) {
            arr.push(transaction)
        }
        for (let j = i+1; j < transactions.length; j++) {
            let transaction2 = transactions[j];
            let date2 = new Date(transaction2.bookingDate)
            if (differenceInMonths(date1, date2) >= 1) {

                arr.push(transaction2)
                i = j;
                break;
            }
        }
    }
    return arr
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

    // console.log(date1.getMonth())
    return monthDiff + yearDiff * 12;
}

function filterData(data) {
    const transactions = data.bankStatements[0].transactions.booked
    transactions.push(data.bankStatements[0].transactions.pending)

    return transactions
}


function dataSorter(data) {
    
    data = filterData(data)
    data = filterOutgoingTransactions(data)
    data = sortTransactionsByCreditor(data)
    data = filterRepeatingAmount(data)
    data = filterMonthly(data)
    return data;
}

export default dataSorter;

