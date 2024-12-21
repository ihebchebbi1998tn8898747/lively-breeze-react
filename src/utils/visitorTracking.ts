import axios from 'axios';
import { toast } from "@/components/ui/use-toast";

const API_URL = 'https://respizenmedical.com/fiori/track_visitor.php';
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const trackVisitor = async (pageName: string, retryCount = 0): Promise<void> => {
  try {
    console.log('Starting visitor tracking for page:', pageName);
    
    // Get visitor's IP directly from the server
    const visitorData = {
      page_visitors: pageName,
      city_visitors: 'Unknown', // We'll let the server handle location data
      country_visitors: 'Unknown', // We'll let the server handle location data
      ip_visitors: 'Server-Side', // The server will capture the real IP
      date_visitors: new Date().toISOString().split('T')[0]
    };

    console.log('Sending visitor data:', visitorData);

    const response = await axios.post(API_URL, visitorData, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    if (response.data.status === 'success') {
      console.log('Visitor tracking successful:', response.data);
    } else {
      throw new Error(response.data.message || 'Unknown error occurred');
    }
  } catch (error) {
    console.error('Error tracking visitor:', error);

    // Implement retry logic
    if (retryCount < MAX_RETRIES) {
      console.log(`Retrying... Attempt ${retryCount + 1} of ${MAX_RETRIES}`);
      await delay(RETRY_DELAY);
      return trackVisitor(pageName, retryCount + 1);
    }

    // Show error toast only after all retries have failed
    toast({
      title: "Tracking Error",
      description: "Unable to track your visit at this time.",
      variant: "destructive",
    });
  }
};