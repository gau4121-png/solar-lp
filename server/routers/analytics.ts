import { publicProcedure, router } from "../_core/trpc";
import { z } from "zod";

/**
 * Generate realistic mock analytics data
 * This is used when Google Analytics API credentials are not available
 * Replace with real GA data once credentials are configured
 */

function generateMockTrafficData() {
  const today = new Date();
  const rows = [];
  
  // Generate 7 days of traffic data
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    
    // Realistic daily traffic patterns
    const baseUsers = 45 + Math.random() * 80;
    const baseSessions = 120 + Math.random() * 200;
    const basePageViews = 350 + Math.random() * 500;
    
    rows.push({
      dimensionValues: [{ value: dateStr }],
      metricValues: [
        { value: Math.round(baseUsers).toString() },
        { value: Math.round(baseSessions).toString() },
        { value: Math.round(basePageViews).toString() },
      ],
    });
  }
  
  return { rows };
}

function generateMockEngagementData() {
  return {
    rows: [
      {
        metricValues: [
          { value: (180 + Math.random() * 120).toFixed(2) }, // avgSessionDuration (seconds)
          { value: (35 + Math.random() * 25).toFixed(2) },   // bounceRate (%)
          { value: (55 + Math.random() * 30).toFixed(2) },   // engagementRate (%)
        ],
      },
    ],
  };
}

function generateMockSourceData() {
  const sources = [
    { name: "Organic Search", baseValue: 280 },
    { name: "Direct", baseValue: 150 },
    { name: "Referral", baseValue: 95 },
    { name: "Social", baseValue: 120 },
    { name: "Email", baseValue: 60 },
  ];

  return {
    rows: sources.map((source) => ({
      dimensionValues: [{ value: source.name }],
      metricValues: [
        {
          value: Math.round(source.baseValue + Math.random() * 50).toString(),
        },
      ],
    })),
  };
}

function generateMockConversionData() {
  return {
    rows: [
      {
        dimensionValues: [{ value: "contact_form_submission" }],
        metricValues: [
          { value: (8 + Math.random() * 5).toString() }, // conversions
          { value: (450 + Math.random() * 300).toString() }, // sessions
        ],
      },
    ],
  };
}

export const analyticsRouter = router({
  // Get real-time user count
  getRealtimeUsers: publicProcedure.query(async () => {
    try {
      // In production, this would call the real GA API
      // For now, return mock data
      const activeUsers = Math.floor(Math.random() * 50) + 5;
      return {
        activeUsers,
      };
    } catch (error) {
      console.error("Failed to fetch realtime users:", error);
      return { activeUsers: 0 };
    }
  }),

  // Get traffic metrics for the last 7 days
  getTrafficMetrics: publicProcedure.query(async () => {
    try {
      // In production, this would call the real GA API
      // For now, return realistic mock data
      return generateMockTrafficData();
    } catch (error) {
      console.error("Failed to fetch traffic metrics:", error);
      return { rows: [] };
    }
  }),

  // Get conversion metrics
  getConversionMetrics: publicProcedure.query(async () => {
    try {
      // In production, this would call the real GA API
      // For now, return realistic mock data
      return generateMockConversionData();
    } catch (error) {
      console.error("Failed to fetch conversion metrics:", error);
      return { rows: [] };
    }
  }),

  // Get engagement metrics (scroll depth, time on page, etc.)
  getEngagementMetrics: publicProcedure.query(async () => {
    try {
      // In production, this would call the real GA API
      // For now, return realistic mock data
      return generateMockEngagementData();
    } catch (error) {
      console.error("Failed to fetch engagement metrics:", error);
      return { rows: [] };
    }
  }),

  // Get traffic by source
  getTrafficBySource: publicProcedure.query(async () => {
    try {
      // In production, this would call the real GA API
      // For now, return realistic mock data
      return generateMockSourceData();
    } catch (error) {
      console.error("Failed to fetch traffic by source:", error);
      return { rows: [] };
    }
  }),
});
