import React from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

export default function MentalHealthChart() {
  const data = [
    { name: 'Experience anxiety/depression', value: 45 },
    { name: 'Academic stress', value: 30 },
    { name: 'Identity concerns', value: 15 },
    { name: 'Family pressure', value: 10 }
  ];

  const COLORS = ['#00D9FF', '#0088CC', '#00FFF0', '#0066AA'];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-slate-900/70 backdrop-blur-sm rounded-3xl p-8 lg:p-12 shadow-xl border border-cyan-400/40 shadow-[0_0_40px_rgba(0,217,255,0.15)]"
    >
      <h3 className="text-3xl font-semibold text-white mb-8 text-center">
        Mental Health Challenges Facing Asian Teens
      </h3>
      
      <div className="flex justify-center">
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value }) => `${name}: ${value}%`}
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value) => `${value}%`}
              contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #00D9FF', borderRadius: '8px', color: '#fff' }}
            />
            <Legend 
              wrapperStyle={{ color: '#fff', paddingTop: '20px' }}
              formatter={(value, entry) => `${entry.payload.name}: ${entry.payload.value}%`}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}