import { supabase } from '@/lib/supabase';

export async function getAndSaveLocation(uid: string, document:Document) {
  if ('geolocation' in navigator) {
    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        });
      });

      const { latitude, longitude } = position.coords;
      const location = `POINT(${longitude} ${latitude})`;

      console.log('location', location);

      // Save to Supabase profile
      const { error } = await supabase
        .from('profiles')
        .update({ location: location })
        .eq('id', uid);

      if (error) {
        console.error('Error updating location in Supabase:', error);
      } else {
        // Set Astro cookie
        document.cookie = `location=${encodeURIComponent(location)}; path=/;`;

        return location;
      }
    } catch (error) {
      console.error('Error getting location:', error);
    }
  } else {
    console.log('Geolocation is not supported by this browser.');
  }

  return null;
}