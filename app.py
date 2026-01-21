from flask import Flask, render_template, request, redirect

app = Flask(__name__)

students = []

@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        name = request.form["name"]
        grade = float(request.form["grade"])

        if grade >= 75:
            status = "Passed"
            css_class = "pass"
        else:
            status = "Failed"
            css_class = "fail"

        students.append({
            "name": name,
            "grade": grade,
            "status": status,
            "class": css_class
        })

        return redirect("/")

    return render_template("index.html", students=students)

if __name__ == "__main__":
    app.run(debug=True)
