from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

def convert_face_to_color(cube_string):
    """Convert face names (U, R, F, D, L, B) to color letters (w, r, g, y, o, b)"""
    mapping = {'U': 'w', 'R': 'r', 'F': 'g', 'D': 'y', 'L': 'o', 'B': 'b'}
    return ''.join(mapping[char] for char in cube_string)

def actual_solve_logic(cube_string):
    try:
        # Check length
        if len(cube_string) != 54:
            return "Error: Invalid cube state format. Expected 54 characters."
        
        # Check if solved
        if cube_string == "UUUUUUUUURRRRRRRRRFFFFFFFFFDDDDDDDDDLLLLLLLLLBBBBBBBBB":
            return "Cube is already solved! No moves needed."
        
        # For demonstration, return a simple solution
        moves = ["R", "U", "R'", "U'", "R", "U", "R'", "U'"]
        return ' '.join(moves)
        
    except Exception as e:
        return f"Error: Could not solve this cube. Details: {e}"

@app.route('/solve', methods=['POST'])
def solve_cube():
    try:
        data = request.get_json()
        if not data:
            return jsonify({'error': 'No JSON data provided'}), 400

        cube = data.get('cube')
        if not cube:
            return jsonify({'error': 'No cube state provided'}), 400

        print(f"Received cube string: {cube}")
        print(f"Length: {len(cube)} characters")

        solution = actual_solve_logic(cube)
        return jsonify({'solution': solution})

    except Exception as e:
        print(f"Error during solve_cube: {e}")
        return jsonify({'error': str(e)}), 500

@app.route('/', methods=['GET'])
def index():
    return "Rubik's Solver Backend is running!"

@app.route('/test', methods=['GET'])
def test_endpoint():
    return jsonify({'message': 'Server is working!'})

if __name__ == '__main__':
    app.run(debug=True, port=5000)