import { useEffect, useRef } from "react";
import * as d3 from "d3";

type PieChartData = {
  categoria: string;
  valor: number;
};

type Props = {
  data: PieChartData[];
  width?: number;
  height?: number;
};

export default function PieChart({
  data,
  width = 400,
  height = 400,
}: Props) {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const radius = Math.min(width, height) / 2;
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // limpa renderizações antigas

    const g = svg
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const color = d3
      .scaleOrdinal<string>()
      .domain(data.map((d) => d.categoria))
      .range(["#4ecdc4", "#ff6b6b", "#ffe66d", "#1a535c", "#5a189a"]);

    const pie = d3
      .pie<PieChartData>()
      .sort(null)
      .value((d) => d.valor);

    const arc = d3
      .arc<d3.PieArcDatum<PieChartData>>()
      .innerRadius(0)
      .outerRadius(radius);

    const arcs = g.selectAll("arc").data(pie(data)).enter().append("g");

    arcs
      .append("path")
      .attr("d", arc as any)
      .attr("fill", (d) => color(d.data.categoria))
      .attr("stroke", "#fff")
      .style("stroke-width", "2px");

    // Rótulos
    arcs
      .append("text")
      .attr("transform", (d) => `translate(${arc.centroid(d)})`)
      .attr("text-anchor", "middle")
      .attr("font-size", "12px")
      .text((d) => d.data.categoria);
  }, [data, width, height]);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <svg ref={svgRef}></svg>
    </div>
  );
}
