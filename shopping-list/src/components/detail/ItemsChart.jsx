import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../context/ThemeContext";

const LIGHT_COLORS = ["#667eea", "#48bb78"];
const DARK_COLORS = ["#818cf8", "#4ade80"];

function ItemsChart({ items }) {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const colors = isDark ? DARK_COLORS : LIGHT_COLORS;

  const resolved = items.filter((i) => i.resolved).length;
  const unresolved = items.filter((i) => !i.resolved).length;

  if (items.length === 0) {
    return (
      <div className="chart-section">
        <div className="chart-section-title">{t("chartTitle")}</div>
        <p className="no-items-msg">{t("noItems")}</p>
      </div>
    );
  }

  const data = [
    { name: t("unresolved"), value: unresolved, colorIndex: 0 },
    { name: t("resolved"), value: resolved, colorIndex: 1 },
  ].filter((d) => d.value > 0);

  return (
    <div className="chart-section">
      <div className="chart-section-title">{t("chartTitle")}</div>
      <div className="chart-wrapper">
        <ResponsiveContainer width={160} height={160}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={45}
              outerRadius={72}
              paddingAngle={data.length > 1 ? 3 : 0}
              dataKey="value"
            >
              {data.map((entry) => (
                <Cell key={entry.name} fill={colors[entry.colorIndex]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value, name) => [value, name]}
              contentStyle={{
                background: isDark ? "#1e293b" : "#fff",
                border: `1px solid ${isDark ? "#334155" : "#e2e8f0"}`,
                borderRadius: 8,
                color: isDark ? "#f1f5f9" : "#1a202c",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="chart-legend">
          <div className="legend-item">
            <div className="legend-dot" style={{ background: colors[0] }} />
            <span>
              {t("unresolved")}: <span className="legend-value">{unresolved}</span>
            </span>
          </div>
          <div className="legend-item">
            <div className="legend-dot" style={{ background: colors[1] }} />
            <span>
              {t("resolved")}: <span className="legend-value">{resolved}</span>
            </span>
          </div>
          <div className="legend-item">
            <div className="legend-dot" style={{ background: isDark ? "#64748b" : "#cbd5e0" }} />
            <span>
              {t("totalItems")}: <span className="legend-value">{items.length}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemsChart;
