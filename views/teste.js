const db = require ("../database/dbServicos.json").servicos

console.log(db)


const preco = 40

console.log(Number(preco.toFixed("2")).toLocaleString("pt-BR", {style: 'currency', currency: 'BRL'}))