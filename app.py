from flask import Flask, flash, redirect, render_template, request, session, abort

app = Flask(__name__)

@app.route('/static/<path:filename>') 
def send_file(filename): 
    return send_from_directory(app.upload_folder, filename)

@app.route("/")
def getMember():  
  return render_template('test.html')
 
if __name__ == "__main__":
  app.run()