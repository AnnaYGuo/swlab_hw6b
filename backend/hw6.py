from flask import Flask, request, jsonify, send_from_directory
import os
# from flask_cors import CORS

# app = Flask(__name__)
app = Flask(__name__, static_folder='../frontend/build/', static_url_path='/')
# CORS(app) # for locally running this

@app.route("/")
def serve():
    return send_from_directory(app.static_folder, "index.html")

@app.route("/<path:path>")
def serve_static_files(path):
    return send_from_directory(app.static_folder, path)
# @app.route('/')
# def index():
    # return app.send_static_file('index.html')

@app.route('/checkin/<int:projectId>/<int:qty>', methods=['GET'])
def checkIn_hardware(projectId, qty):
    message = f"{qty} hardware checked in"
    return jsonify({"message": message, "projectId": projectId, "quantity": qty})

@app.route('/checkout/<int:projectId>/<int:qty>', methods=['GET'])
def checkOut_hardware(projectId, qty):
    message = f"{qty} hardware checked out"
    return jsonify({"message": message, "projectId": projectId, "quantity": qty})

@app.route('/joinproject/<int:projectId>', methods=['GET'])
def joinProject(projectId):
    message = f"Joined {projectId}"
    return jsonify({"message": message, "projectId": projectId})

@app.route('/leaveproject/<int:projectId>', methods=['GET'])
def leaveProject(projectId):
    message = f"Left {projectId}"
    return jsonify({"message": message, "projectId": projectId})

@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')

if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=False, port=os.environ.get('PORT', 5000))
    # app.run(debug=True, port=5000)  


