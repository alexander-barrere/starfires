import sys
import os
from kerykeion import KrInstance, MakeSvgInstance
from datetime import datetime

def generate_svg_and_print_path(svg_instance):
    svg_instance.makeSVG()
    relative_svg_file_path = os.path.join("assets/charts", os.path.basename(svg_instance.chartname))
    print(relative_svg_file_path)

# Get the user data from the command-line arguments
first_name, birth_date, birth_time, city, chart_type = sys.argv[1:]

# Parse the birth date and time
birth_date = datetime.strptime(birth_date, "%Y-%m-%d")
birth_time = datetime.strptime(birth_time, "%H:%M")

# Create a KrInstance object
kr_instance = KrInstance(first_name, birth_date.year, birth_date.month, birth_date.day, birth_time.hour, birth_time.minute, city)

# Use the KrInstance object to create a MakeSvgInstance object
make_svg_instance = MakeSvgInstance(kr_instance, chart_type=chart_type)

# Define the directory to save the SVG file, adjust based on your frontend asset path
svg_dir = "../starfires_v2/src/assets/charts/"
os.makedirs(svg_dir, exist_ok=True)

# Set the output directory for the MakeSvgInstance object
make_svg_instance.set_output_directory(svg_dir)

# Generate the SVG file and print the path
generate_svg_and_print_path(make_svg_instance)

print("SVG file generated.")
