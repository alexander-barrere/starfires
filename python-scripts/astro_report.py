import sys
import os
from kerykeion import KrInstance, MakeSvgInstance
from datetime import datetime

def generate_svg_and_print_path(svg_instance, output_directory):
    try:
        svg_instance.makeSVG()
        relative_svg_file_path = os.path.join(output_directory, os.path.basename(svg_instance.chartname))
        print(relative_svg_file_path)
    except Exception as e:
        print(f"Error generating SVG: {e}", file=sys.stdout)
        sys.exit(1)

# Get the user data from the command-line arguments
birth_date, birth_time, latitude, longitude = sys.argv[1:5]
chart_type = sys.argv[5] if len(sys.argv) > 5 else "natal"

# Parse the birth date and time
birth_date = datetime.strptime(birth_date, "%Y-%m-%d")
birth_time = datetime.strptime(birth_time, "%H:%M")

# Create a KrInstance object
kr_instance = KrInstance("User", birth_date.year, birth_date.month, birth_date.day, birth_time.hour, birth_time.minute, latitude, longitude)

# Use the KrInstance object to create a MakeSvgInstance object
make_svg_instance = MakeSvgInstance(kr_instance, chart_type=chart_type)

# Define the directory to save the SVG file, adjust based on your frontend asset path
svg_dir = "../starfires_v2_frontend/src/assets/charts/"
os.makedirs(svg_dir, exist_ok=True)
print(f"SVG directory ensured at: {svg_dir}", file=sys.stdout)

# Set the output directory for the MakeSvgInstance object
make_svg_instance.set_output_directory(svg_dir)

# Generate the SVG and print the file path
generate_svg_and_print_path(make_svg_instance, svg_dir)