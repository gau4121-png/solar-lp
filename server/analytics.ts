/**
 * Google Analytics Data API integration
 * Fetches metrics from GA4 property 418625353
 */

import { BetaAnalyticsDataClient } from "@google-analytics/data";

const PROPERTY_ID = "418625353";

// Initialize the Analytics Data client
// Uses GOOGLE_APPLICATION_CREDENTIALS environment variable for authentication
let analyticsClient: BetaAnalyticsDataClient | null = null;

function getAnalyticsClient(): BetaAnalyticsDataClient {
  if (!analyticsClient) {
    // Check if credentials are available
    if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
      console.warn(
        "GOOGLE_APPLICATION_CREDENTIALS not set. Analytics data will use mock data."
      );
    }
    analyticsClient = new BetaAnalyticsDataClient();
  }
  return analyticsClient;
}

export interface AnalyticsMetrics {
  activeUsers: number;
  sessions: number;
  pageViews: number;
  engagementRate: number;
  bounceRate: number;
  avgSessionDuration: number;
  conversionRate: number;
}

/**
 * Fetch analytics metrics from GA4
 * Falls back to mock data if credentials are not configured
 */
export async function fetchAnalyticsMetrics(
  daysBack: number = 30
): Promise<AnalyticsMetrics> {
  try {
    // If no credentials, return mock data
    if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
      return getMockAnalyticsData();
    }

    const client = getAnalyticsClient();
    const today = new Date();
    const startDate = new Date(today.getTime() - daysBack * 24 * 60 * 60 * 1000);

    const dateRanges = [
      {
        startDate: startDate.toISOString().split("T")[0],
        endDate: today.toISOString().split("T")[0],
      },
    ];

    // Fetch main metrics
    const [response] = await client.runReport({
      property: `properties/${PROPERTY_ID}`,
      dateRanges,
      dimensions: [],
      metrics: [
        { name: "activeUsers" },
        { name: "sessions" },
        { name: "screenPageViews" },
        { name: "engagementRate" },
        { name: "bounceRate" },
        { name: "averageSessionDuration" },
      ],
    });

    // Extract metric values
    const row = response.rows?.[0];
    if (!row) {
      return getMockAnalyticsData();
    }

    const metrics = row.metricValues || [];

    return {
      activeUsers: parseInt(metrics[0]?.value || "0", 10),
      sessions: parseInt(metrics[1]?.value || "0", 10),
      pageViews: parseInt(metrics[2]?.value || "0", 10),
      engagementRate: parseFloat(metrics[3]?.value || "0"),
      bounceRate: parseFloat(metrics[4]?.value || "0"),
      avgSessionDuration: parseFloat(metrics[5]?.value || "0"),
      conversionRate: 0.85, // Placeholder - would need conversion event setup
    };
  } catch (error) {
    console.error("Failed to fetch GA metrics:", error);
    // Return mock data on error
    return getMockAnalyticsData();
  }
}

/**
 * Get mock analytics data for development/testing
 */
function getMockAnalyticsData(): AnalyticsMetrics {
  return {
    activeUsers: Math.floor(Math.random() * 500) + 100,
    sessions: Math.floor(Math.random() * 1000) + 200,
    pageViews: Math.floor(Math.random() * 2000) + 500,
    engagementRate: Math.random() * 100,
    bounceRate: Math.random() * 60 + 20,
    avgSessionDuration: Math.random() * 300 + 60,
    conversionRate: Math.random() * 2 + 0.5,
  };
}

/**
 * Fetch channel-specific metrics
 */
export async function fetchChannelMetrics(
  channel: "organic" | "direct" | "referral" | "social"
) {
  try {
    if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
      return getMockChannelData(channel);
    }

    const client = getAnalyticsClient();
    const today = new Date();
    const startDate = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

    const channelMap: Record<string, string> = {
      organic: "Organic Search",
      direct: "Direct",
      referral: "Referral",
      social: "Social",
    };

    const [response] = await client.runReport({
      property: `properties/${PROPERTY_ID}`,
      dateRanges: [
        {
          startDate: startDate.toISOString().split("T")[0],
          endDate: today.toISOString().split("T")[0],
        },
      ],
      dimensions: [{ name: "sessionSource" }],
      metrics: [
        { name: "activeUsers" },
        { name: "sessions" },
        { name: "screenPageViews" },
      ],
      dimensionFilter: {
        filter: {
          fieldName: "sessionSource",
          stringFilter: {
            matchType: "EXACT",
            value: channelMap[channel],
          },
        },
      },
    });

    const row = response.rows?.[0];
    if (!row) {
      return getMockChannelData(channel);
    }

    const metrics = row.metricValues || [];

    return {
      channel,
      users: parseInt(metrics[0]?.value || "0", 10),
      sessions: parseInt(metrics[1]?.value || "0", 10),
      pageViews: parseInt(metrics[2]?.value || "0", 10),
    };
  } catch (error) {
    console.error(`Failed to fetch ${channel} metrics:`, error);
    return getMockChannelData(channel);
  }
}

function getMockChannelData(channel: string) {
  return {
    channel,
    users: Math.floor(Math.random() * 300) + 50,
    sessions: Math.floor(Math.random() * 600) + 100,
    pageViews: Math.floor(Math.random() * 1200) + 300,
  };
}
