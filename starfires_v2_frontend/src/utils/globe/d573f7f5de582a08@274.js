function _1(md){return(
md`<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">World tour</h1><a href="https://d3js.org/">D3</a> › <a href="/@d3/gallery">Gallery</a></div>

# World tour

This animation uses [d3.geoInterpolate](https://d3js.org/d3-geo/math#geoInterpolate) to interpolate a path along great arcs, and [spherical linear interpolation](https://en.wikipedia.org/wiki/Slerp) to rotate the [orthographic](/@d3/orthographic) projection.`
)}

function _2(html,name){return(
html`<b style="display:block;text-align:center;line-height:33px;">${name}`
)}

async function* _canvas(width,d3,land,borders,countries,$0,Versor)
{
  // Specify the chart’s dimensions.
  const height = Math.min(width, 720); // Observable sets a responsive *width*

  // Prepare a canvas.
  const dpr = window.devicePixelRatio ?? 1;
  const canvas = d3.create("canvas")
      .attr("width", dpr * width)
      .attr("height", dpr * height)
      .style("width", `${width}px`);
  const context = canvas.node().getContext("2d");
  context.scale(dpr, dpr);

  // Create a projection and a path generator.
  const projection = d3.geoOrthographic().fitExtent([[10, 10], [width - 10, height - 10]], {type: "Sphere"});
  const path = d3.geoPath(projection, context);
  const tilt = 20;

  function render(country, arc) {
    context.clearRect(0, 0, width, height);
    context.beginPath(), path(land), context.fillStyle = "#ccc", context.fill();
    context.beginPath(), path(country), context.fillStyle = "#f00", context.fill();
    context.beginPath(), path(borders), context.strokeStyle = "#fff", context.lineWidth = 0.5, context.stroke();
    context.beginPath(), path({type: "Sphere"}), context.strokeStyle = "#000", context.lineWidth = 1.5, context.stroke();
    context.beginPath(), path(arc), context.stroke();
    return context.canvas;
  }

  let p1, p2 = [0, 0], r1, r2 = [0, 0, 0];
  for (const country of countries) {
    $0.value = country.properties.name;
    yield render(country);

    p1 = p2, p2 = d3.geoCentroid(country);
    r1 = r2, r2 = [-p2[0], tilt - p2[1], 0];
    const ip = d3.geoInterpolate(p1, p2);
    const iv = Versor.interpolateAngles(r1, r2);

    await d3.transition()
        .duration(1250)
        .tween("render", () => t => {
          projection.rotate(iv(t));
          render(country, {type: "LineString", coordinates: [p1, ip(t)]});
        })
      .transition()
        .tween("render", () => t => {
          render(country, {type: "LineString", coordinates: [ip(t), p2]});
        })
      .end();
  }
}


function _Versor(){return(
class Versor {
  static fromAngles([l, p, g]) {
    l *= Math.PI / 360;
    p *= Math.PI / 360;
    g *= Math.PI / 360;
    const sl = Math.sin(l), cl = Math.cos(l);
    const sp = Math.sin(p), cp = Math.cos(p);
    const sg = Math.sin(g), cg = Math.cos(g);
    return [
      cl * cp * cg + sl * sp * sg,
      sl * cp * cg - cl * sp * sg,
      cl * sp * cg + sl * cp * sg,
      cl * cp * sg - sl * sp * cg
    ];
  }
  static toAngles([a, b, c, d]) {
    return [
      Math.atan2(2 * (a * b + c * d), 1 - 2 * (b * b + c * c)) * 180 / Math.PI,
      Math.asin(Math.max(-1, Math.min(1, 2 * (a * c - d * b)))) * 180 / Math.PI,
      Math.atan2(2 * (a * d + b * c), 1 - 2 * (c * c + d * d)) * 180 / Math.PI
    ];
  }
  static interpolateAngles(a, b) {
    const i = Versor.interpolate(Versor.fromAngles(a), Versor.fromAngles(b));
    return t => Versor.toAngles(i(t));
  }
  static interpolateLinear([a1, b1, c1, d1], [a2, b2, c2, d2]) {
    a2 -= a1, b2 -= b1, c2 -= c1, d2 -= d1;
    const x = new Array(4);
    return t => {
      const l = Math.hypot(x[0] = a1 + a2 * t, x[1] = b1 + b2 * t, x[2] = c1 + c2 * t, x[3] = d1 + d2 * t);
      x[0] /= l, x[1] /= l, x[2] /= l, x[3] /= l;
      return x;
    };
  }
  static interpolate([a1, b1, c1, d1], [a2, b2, c2, d2]) {
    let dot = a1 * a2 + b1 * b2 + c1 * c2 + d1 * d2;
    if (dot < 0) a2 = -a2, b2 = -b2, c2 = -c2, d2 = -d2, dot = -dot;
    if (dot > 0.9995) return Versor.interpolateLinear([a1, b1, c1, d1], [a2, b2, c2, d2]); 
    const theta0 = Math.acos(Math.max(-1, Math.min(1, dot)));
    const x = new Array(4);
    const l = Math.hypot(a2 -= a1 * dot, b2 -= b1 * dot, c2 -= c1 * dot, d2 -= d1 * dot);
    a2 /= l, b2 /= l, c2 /= l, d2 /= l;
    return t => {
      const theta = theta0 * t;
      const s = Math.sin(theta);
      const c = Math.cos(theta);
      x[0] = a1 * c + a2 * s;
      x[1] = b1 * c + b2 * s;
      x[2] = c1 * c + c2 * s;
      x[3] = d1 * c + d2 * s;
      return x;
    };
  }
}
)}

function _name(){return(
""
)}

function _countries(topojson,world){return(
topojson.feature(world, world.objects.countries).features
)}

function _borders(topojson,world){return(
topojson.mesh(world, world.objects.countries, (a, b) => a !== b)
)}

function _land(topojson,world){return(
topojson.feature(world, world.objects.land)
)}

function _world(FileAttachment){return(
FileAttachment("countries-110m.json").json()
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["countries-110m.json", {url: new URL("./files/26fc08875c617b59939afa42f6f1e1bf5e75f11dcc2e482d963b6e4128f0250d708f983050a43862ae73d016bc328d1f3f40bc0df709d5dd310f789f334c0ee8.json", import.meta.url), mimeType: "application/json", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["html","name"], _2);
  main.variable(observer("canvas")).define("canvas", ["width","d3","land","borders","countries","mutable name","Versor"], _canvas);
  main.variable(observer("Versor")).define("Versor", _Versor);
  main.define("initial name", _name);
  main.variable(observer("mutable name")).define("mutable name", ["Mutable", "initial name"], (M, _) => new M(_));
  main.variable(observer("name")).define("name", ["mutable name"], _ => _.generator);
  main.variable(observer("countries")).define("countries", ["topojson","world"], _countries);
  main.variable(observer("borders")).define("borders", ["topojson","world"], _borders);
  main.variable(observer("land")).define("land", ["topojson","world"], _land);
  main.variable(observer("world")).define("world", ["FileAttachment"], _world);
  return main;
}
