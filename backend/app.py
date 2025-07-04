

from flask import Flask, request, jsonify
from flask_cors import CORS
import kociemba

app = Flask(__name__)
CORS(app)

def actual_solve_logic(cube_string):
    try:
    
        normalized_cube_string = cube_string.encode('utf-8').decode('utf-8')
        print(f"DEBUG: Normalized string length: {len(normalized_cube_string)} chars for string: '{normalized_cube_string}'")

        
        if len(normalized_cube_string) != 54:
            print(f"DEBUG: Input length mismatch. Got {len(normalized_cube_string)} chars for string: '{normalized_cube_string}'")
            return "Error: Invalid cube state format. Expected 54 characters."
        
        print(f"DEBUG: Length of string right before kociemba.solve(): {len(normalized_cube_string)}") 

        print(f"DEBUG: Attempting to solve with kociemba.solve('{normalized_cube_string}')")
        solution = kociemba.solve(normalized_cube_string)
        return solution
    except Exception as e:
        print(f"ERROR: Kociemba solving failed for '{normalized_cube_string}': {e}")
        return f"Error: Kociemba could not solve this cube. Details: {e}. Please ensure it's a valid and solvable cube state."

@app.route('/solve', methods=['POST'])
def solve_cube():
    try:
        data = request.get_json()
        if not data:
            return jsonify({'error': 'No JSON data provided'}), 400

        cube = data.get('cube')

        if not cube:
            return jsonify({'error': 'No cube state provided'}), 400

        print(f"Received data: {data}")
        print(f"Cube string: {cube}")

        solution = actual_solve_logic(cube)
        return jsonify({'solution': solution})

    except Exception as e:
        print(f"Error during solve_cube (outer catch): {e}")
        return jsonify({'error': str(e)}), 500

@app.route('/', methods=['GET'])
def index():
    return "Rubik's Solver Backend is running!"

if __name__ == '__main__':
    app.run(debug=True)