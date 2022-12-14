import { transactionCollection } from "../db/mongo.js";
import { stripHtml } from "string-strip-html";
import dayjs from 'dayjs';

export async function newTransaction(req, res) {
  const data = req.body;
  const type = req.params.type;
  const description = stripHtml(data.description).result;
  const date = dayjs(Date(Date.now())).format('DD/MM');

  try {
    await transactionCollection.insertOne({
      email: req.currentUser.email,
      amount: data.amount,
      description: description,
      type: type,
      date: date
    });

    return res.sendStatus(201);
  } catch (e) {
    return res.sendStatus(500);
  }
}

export async function getTransactions(req, res) {
  const data = req.currentUser;

  try {
    const transactions = await transactionCollection
    .find( {email: data.email} )
    .toArray();

    return res.status(200).send(transactions);
  } catch (e) {
    return res.status(500).send('Não foi possível buscar as transações');
  }
}