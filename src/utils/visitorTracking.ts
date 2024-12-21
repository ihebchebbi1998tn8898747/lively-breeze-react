import axios from 'axios';
import { toast } from "@/components/ui/use-toast";

interface LocationData {
  ip: string;
  city: string;
  country: string;
}

interface VisitorData {
  page_visitors: string;
  city_visitors: string;
  country_visitors: string;
  ip_visitors: string;
  date_visitors: string;
}

const API_URL = 'https://respizenmedical.com/fiori/track_visitor.php';
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const trackVisitor = async (pageName: string, retryCount = 0): Promise<void> => {
  try {
    console.log('Starting visitor tracking for page:', pageName);
    
    // Get visitor's IP
    const ipResponse = await axios.get('https://api.ipify.org?format=json');
    const ip = ipResponse.data.ip;
    console.log('Visitor IP obtained:', ip);
    
    // Get location data
    const locationResponse = await axios.get(`https://ipapi.co/${ip}/json/`);
    const locationData: LocationData = {
      ip: ip,
      city: locationResponse.data.city || 'Unknown',
      country: locationResponse.data.country_name || 'Unknown'
    };
    console.log('Location data obtained:', locationData);

    const visitorData: VisitorData = {
      page_visitors: pageName,
      city_visitors: locationData.city,
      country_visitors: locationData.country,
      ip_visitors: locationData.ip,
      date_visitors: new Date().toISOString().split('T')[0]
    };
    
    // Send tracking data with proper headers
    const response = await axios.post(API_URL, visitorData, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    if (response.data.status === 'success') {
      console.log('Visitor tracking data sent successfully');
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
    if (retryCount === MAX_RETRIES) {
      toast({
        title: "Error Tracking Visit",
        description: "Unable to track your visit at this time.",
        variant: "destructive",
      });
    }
  }
};