import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, Image, ScrollView, TouchableOpacity, ImageBackground, StyleSheet, Modal, Button, Pressable } from 'react-native';

const Plant = (props) => {
  const [size, setSize] = useState(50);
  const [growSize, setGrowSize] = useState(100);
  const [imageSource, setImageSource] = useState(1);
  const [planted, setPlanted] = useState(false);

  const plant_styles = StyleSheet.create({
    buttonImage: {
      width: 170,
      height: 210,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'flex-end',
      opacity: planted
    },
  });

  const handleClick = () => {
    if (planted) {
      setSize(size + 10)
      if (size > growSize) {
        setImageSource(imageSource + 1);
        setGrowSize(growSize * 2);
      }
    } else if (props.canBuy(props.price)) {
      props.onSell(-props.price);
      setImageSource(1);
      setSize(50);
      setGrowSize(100);
      setPlanted(true);
    }

  }
  
  const handleSell = () => {
    setSize(50);
    if (imageSource > 3) {
      props.onSell(props.sellGrown);
    }
    else {
      props.onSell(props.sellSmall);
    }
    setPlanted(false);
    setImageSource(1);

  }
  
  return (
    <View style={{width: '50%', height: '25%', alignItems: 'center', justifyContent: 'flex-end', padding: 20}}>
      <TouchableOpacity
        onPress={handleClick}
        onLongPress={handleSell}
      >
        <View style = {{justifyContent: 'center', alignSelf: 'center', position: 'absolute', bottom: -35}}>
          <ImageBackground
            source={props.images[imageSource - 1]}
            style={plant_styles.buttonImage}
            
          >
          </ImageBackground>
        </View>
      </TouchableOpacity>
      <Image
        source={require('./assets/pot.png')}
        style={{width: 50, height: 51, position: 'absolute', bottom: 0}}
      />
      <Image
        source={require('./assets/saucer.png')}
        style={{width: 55, height: 13, position: 'absolute', bottom: 0}}
      />
    </View>
  );
  
};

export default function App() {
  const [savings, setSavings] = useState(10);
  const [showShop, setShowShop] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState(2);
 

  const numPlants = 8;

  const removePlant = (deletingPlantid) => {
    const updatedPlants = allPlants.filter((plant) => plant.id !== deletingPlantid);
    setAllPlants(updatedPlants);

  }
  function renderPlants() {
    const plantsData = Array.from({ length: numPlants }, (_, index) => ({
      id: index,
      name: 'monstera',
      sellGrown: 30,
      sellSmall: 5,
      price: 5,
      images: [
        require('./assets/monstera1.png'),
        require('./assets/monstera2.png'),
        require('./assets/monstera3.png'),
        require('./assets/monstera4.png')
      ]
    }));

    return plantsData.map((plantData) => (
      <Plant
        key={plantData.id}
        onSell={(price) => setSavings((prevSavings) => prevSavings + price)}
        canBuy={(price) => {return savings > price}}
        {...plantData}
        removeSelf={() => removePlant(plantData)}
      />
    ));
  }

  const [allPlants, setAllPlants] = useState(renderPlants());

  const renderShop = () => {
    return (
      <Modal
        transparent={true}
        visible={showShop}
      >
        <View
          style = {{backgroundColor: 'rgba(0, 0, 0, 0.8)', height: '100%', alignItems: 'center'}}
        >
          <View style={{backgroundColor: 'white', margin: 50, alignItems: 'center', padding: 40, borderRadius: 10, marginTop: 100, marginBottom: 100, height: '70%', width: '80%'}}>
            <Text>Shop</Text>
            <Button color='blue' title='monstera' onPress={setSelectedPlant(1)}/>
            <Button title='thaicon' onPress={setSelectedPlant(2)}/>
            
            
            
          </View>
          <View style={{position: 'absolute', bottom: 80}}>
              <Pressable
                onPress={() => {
                  setShowShop(false);
                }}
                style={{
                    backgroundColor: '#e8d76b',
                    padding: 10,
                    borderRadius: 50,
                    width: 100,
                    alignItems: 'center'
                  }}>
                  <Text style={{fontSize: 30}}>buy</Text>
                  
                
              </Pressable>
            </View>
        </View>
      </Modal>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
    
      <Text style = {{width: '100%', textAlign: 'center', position: 'absolute', top: 70, fontWeight: 'bold', fontSize: 20}}> {savings}</Text>
      <View style = {styles.grid}>
        {allPlants}
        
      </View>
      

    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexGrow: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 50
  },
  container: {
    backgroundColor: '#d4f6ff',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    padding: 50

  }
});
