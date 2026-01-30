import axios from 'axios';

const base_url = "http://127.0.0.1:5000";

export const expenseTools = [
    {
        name: "add_expense",
        description : "Add a new expense entry",
        inputSchema: {
            type: "object",
            properties:{
                title: {type:  "string", description: "Title of the expense"},
                amount: {type: "number", description: "Amount of the expense"},
                date: {type: "string", description: "Date of the expense in YYYY-MM-DD format"}
            },
            required: ["title","amount","date"]
        },
        async execute(input){
            const response = await axios.post(`${base_url}/add_expense`, input);
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(response.data, null, 2)
                }]
            };
        }
    },
    {
        name: "get_expenses",
        description: "Get all the expenses",
        inputSchema: { type: "object", properties: {} },
        async execute() {
            const response = await axios.get(`${base_url}/get_expenses`);
            const expenses = response.data.map((item, index) => ({
                id: Number(item.id ?? index + 1),
                title: String(item.title ?? ""),
                amount: Number(item.amount ?? 0),
                date: String(item.date ?? "1970-01-01")
            }));
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(expenses, null, 2)
                }]
            };
        }
    },
    {
        name: "delete_expense",
        description: "Delete an expense by the given id",
        inputSchema: {
            type: "object",
            properties:{
                id: {type: "number", description: "id of the expense to be deleted"}
            },
            required: ["id"]
        },
        async execute(input){
            const response = await axios.delete(`${base_url}/delete_expense/${input.id}`);
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(response.data, null, 2)
                }]
            };
        }
    },
    {
        name: "update_expense",
        description: "Update the details of the expense on the basis of the given id",
        inputSchema:{
            type:"object",
            properties:{
                id: {type : "number", description: "id of the expense to be updated"},
                title: {type:  "string", description: "Updated title of the expense"},
                amount: {type: "number", description: "Updated amount of the expense"},
                date: {type: "string", description: "Updated date of the expense in YYYY-MM-DD format"}
            },
            required: ["id","title","amount","date"]
        },
        async execute(input){
            const { id, ...updateData } = input;
            const response = await axios.put(`${base_url}/update_expense/${id}`, updateData);
            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(response.data, null, 2)
                }]
            };
        }
    }
]