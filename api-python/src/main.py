import sys
import os

sys.path.append(os.path.abspath(os.path.dirname(__file__)))

from flask import Flask, request, jsonify
from flask_cors import CORS
from generate_food_adiction_report import generate_food_addiction_report

app = Flask(__name__)
CORS(
    app,
    resources={r"/*": {"origins": "*", "supports_credentials": True}},
)

UPLOAD_FOLDER = "uploads"
ALLOWED_EXTENSIONS = {"jpg", "jpeg", "mp4"}
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

# Caminho absoluto para o diretório de uploads
project_root = os.path.dirname(os.path.abspath(__file__))
upload_folder = os.path.join(project_root, UPLOAD_FOLDER)

os.makedirs(upload_folder, exist_ok=True)


def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route("/ping", methods=["GET"])
def ping():
    return jsonify({"message": "pong py"})


@app.route("/food-adiction-report", methods=["GET"])
def gerenate_ulcer_report_controller():

    report = generate_food_addiction_report()

    return jsonify(report)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
