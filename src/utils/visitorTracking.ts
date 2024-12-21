import axios from 'axios';
import { toast } from "@/components/ui/use-toast";

const API_URL = 'https://respizenmedical.com/fiori/track_visitor.php';
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

interface VisitorData {
  page_visitors: string;
  city_visitors: string;
  country_visitors: string;
  ip_visitors: string;
  date_visitors: string;
}

export const trackVisitor = async (pageName: string, retryCount = 0): Promise<void> => {
  try {
    console.log('Starting visitor tracking for page:', pageName);
    
    const visitorData: VisitorData = {
      page_visitors: pageName,
      city_visitors: 'Unknown', // Server will handle this
      country_visitors: 'Unknown', // Server will handle this
      ip_visitors: 'Server-Side', // Server will detect the real IP
      date_visitors: new Date().toISOString().split('T')[0]
    };

    console.log('Sending visitor data:', visitorData);

    const response = await axios.post(API_URL, visitorData, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      timeout: 5000 // 5 seconds timeout
    });

    console.log('Tracking response:', response.data);

    if (response.data.status === 'success') {
      console.log('Visitor tracking successful:', response.data);
    } else {
      throw new Error(response.data.message || 'Unknown error occurred');
    }
  } catch (error) {
    console.error('Error tracking visitor:', error);

    if (retryCount < MAX_RETRIES) {
      console.log(`Retrying... Attempt ${retryCount + 1} of ${MAX_RETRIES}`);
      await delay(RETRY_DELAY * (retryCount + 1)); // Exponential backoff
      return trackVisitor(pageName, retryCount + 1);
    }

    // Only show error toast in production
    if (process.env.NODE_ENV === 'production') {
      toast({
        title: "Tracking Error",
        description: "Unable to track your visit at this time.",
        variant: "destructive",
      });
    }
  }
};