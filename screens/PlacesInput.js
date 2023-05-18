import React from 'react';
import Text from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';


class PlacesInput extends React.Component {
  render() {
    return (
      <GooglePlacesAutocomplete
        placeholder='Lieu'
        minLength={2}
        autoFocus={false}
        listViewDisplayed='auto'
        returnKeytype={'search'}
        fetchDetails={true}
        keyboardAppearence={'light'}
        renderDescription={row => row.description}
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          console.log(data, details);
        }}
        getDefaultValue={() => ''}
        query={{
          key: 'AIzaSyAyfZXiJry0_4jJ-HwGexie7hc5J50uF7U',
          language: 'en',
          type: 'cities'
        }}
  
        styles={{
            textInputContainer: {
                width: '100%'
            },
            description: {
                fontWeight: 'bold'
            },
            predefinedPlacesDescription: {
                color: '#1faadb'
            }
        }}
        currentLocation={true}
        currentLocationLabel="Localisation actuelle"
        nearbyPlacesAPI='GooglePlacesSearch'
  
        GooglePlacesSearchQuery={{
            rankby: 'distance',
            type: 'bank'
        }}

        GoogleReverseGeocodingQuery={{

        }}
  
        GooglePlacesDetailsQuery={{
  
          fields: 'formatted_address',
        }}
  
        filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']}
        debounce={200}
        //renderRightButton={() => <Text>PSL</Text>}
        
  
      />
    );
  
  }; }
  export default PlacesInput;

