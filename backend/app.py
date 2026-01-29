from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
from database import create_table, get_connection

app = Flask(__name__)
CORS(app)

# Create table when app starts
create_table()

# -------------------------------
# ADD EXPENSE (POST)
# -------------------------------
@app.route("/add_expense", methods=["POST"])
def add_expense():
    data = request.json
    if not data:
        return jsonify({"error": "Invalid JSON data"}), 400

    title = data.get("title")
    amount = data.get("amount")
    date = data.get("date")

    if not title or not amount or not date:
        return jsonify({"error": "Missing required fields"}), 400

    conn = get_connection()
    cursor = conn.cursor()

    try:
        cursor.execute(
            "INSERT INTO expenses (title, amount, date) VALUES (?, ?, ?)",
            (title, amount, date)
        )
        conn.commit()
        return jsonify({"message": "Expense added successfully!"}), 201
    except sqlite3.Error as e:
        return jsonify({"error": str(e)}), 500
    finally:
        conn.close()


# -------------------------------
# GET ALL EXPENSES (GET)
# -------------------------------
@app.route("/get_expenses", methods=["GET"])
def get_expenses():
    conn = get_connection()
    cursor = conn.cursor()

    try:
        cursor.execute("SELECT * FROM expenses")
        rows = cursor.fetchall()

        expenses = []
        for row in rows:
            expenses.append({
                "id": row[0],
                "title": row[1],
                "amount": row[2],
                "date": row[3]
            })

        return jsonify(expenses), 200
    except sqlite3.Error as e:
        return jsonify({"error": str(e)}), 500
    finally:
        conn.close()


# -------------------------------
# DELETE EXPENSE (DELETE)
# -------------------------------
@app.route("/delete_expense/<int:id>", methods=["DELETE"])
def delete_expense(id):
    conn = get_connection()
    cursor = conn.cursor()

    try:
        cursor.execute("DELETE FROM expenses WHERE id = ?", (id,))
        conn.commit()
        return jsonify({"message": "Expense deleted successfully!"}), 200
    except sqlite3.Error as e:
        return jsonify({"error": str(e)}), 500
    finally:
        conn.close()


# -------------------------------
# UPDATE EXPENSE (PUT)
# -------------------------------
@app.route("/update_expense/<int:id>", methods=["PUT"])
def update_expense(id):
    data = request.json
    if not data:
        return jsonify({"error": "Invalid JSON data"}), 400

    title = data.get("title")
    amount = data.get("amount")
    date = data.get("date")

    if not title or not amount or not date:
        return jsonify({"error": "Missing required fields"}), 400

    conn = get_connection()
    cursor = conn.cursor()

    try:
        cursor.execute(
            "UPDATE expenses SET title = ?, amount = ?, date = ? WHERE id = ?",
            (title, amount, date, id)
        )
        conn.commit()
        return jsonify({"message": "Expense updated successfully!"}), 200
    except sqlite3.Error as e:
        return jsonify({"error": str(e)}), 500
    finally:
        conn.close()


# -------------------------------
# APP ENTRY POINT
# -------------------------------
if __name__ == "__main__":
    app.run(debug=True)
