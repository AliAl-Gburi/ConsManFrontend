import { View, Text, TouchableWithoutFeedback, StyleSheet, Image, TextInput, Platform, Pressable, Dimensions } from 'react-native'
import React, { Component } from 'react'
import { useState, useEffect } from "react";
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import * as SQLite from "expo-sqlite";
import MovieService from '../../services/movieService';
import WikiService from '../../services/wikiService';
import axios from 'axios';



function openDatabase() {
    if (Platform.OS === "web") {
        return {
            transaction: () => {
                return {
                    executeSql: () => {},
                };
            },
        };
    }
    const db = SQLite.openDatabase("../../db.db");
    return db;
}

const db = openDatabase();



export default function Add() {

  const [category, setCategory] = useState('');
  const [text, setText] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
   
    db.transaction((tx) => {
        tx.executeSql(
            "create table if not exists content (id integer primary key not null, status integer, title text, category text);"
        );
    })
    
    
  }, [data]);

const getImages = (dat) => {
   

   // const name = data[0].name;
  
    for(let i = 0; i < dat.length; i++) {
      console.log(dat[i].name)
      obj(dat[i].name)
    }
    

      

   // obj(name)
        

        
        
}

const obj = async(name) => {
  const json = await WikiService.getImage(`https://api.themoviedb.org/3/search/movie?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb&query=${name}`)
  const path = json.data.results[0].poster_path
  
  const imglink = {lemme: `http://image.tmdb.org/t/p/w500/${path}`}
  
  return imglink;
}

const getll = (name) => {
  return obj(name)
}

  const add = (cate, title) => {
    if(cate === '' || title === '') {
        return false;
    }

    db.transaction(
        (tx) => {
            console.log(title);
            console.log(cate);
            tx.executeSql("insert into content (status ,title, category) values (0 ,?, ?)", [title, cate]);
            tx.executeSql("select * from content", [], (_, {rows}) =>
                console.log(JSON.stringify(rows))
            );
        },
        null
    );
  };

  




  const predictor = async(txt) => {
    const resp = await MovieService.getPredictions(txt);
    
    setData(resp.data)
    
    //getImages(resp.data);
    
    
    
    
    

    /**
     * <TextInput onChangeText={(text) => {predictor(text)}}
                 placeholder={category === '' ? "Select a category" : category}
                 style={category === '' ? styles.inputdisabled : styles.input}
                 value={text}
                 editable={category !== ''}
                 selectionColor='tomato' />

     * <Pressable style={styles.btn}
        onPress={() => {add(category, text)}}>
          <Text style={styles.btntext}>Add</Text>
        </Pressable>
     */

  }
  
  

  function catSetter(cat) {
    if(category === '' || category !== cat) {
        setCategory(cat)
    } else {
        setCategory('')
    }
  }

  return (
    <View style={styles.maincontainer}>
      
       
      <Text style={styles.headers} >Category</Text>
      <View style={styles.categories}>
        <TouchableWithoutFeedback onPress={() => {catSetter("Video Game")}} >
          <View style={category === 'Video Game' ? styles.iconactive : styles.iconsinactive}>
              <FontAwesome name="gamepad" size={24} color='white' />
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => {catSetter("Movie")}} >
          <View style={category === "Movie" ? styles.iconactive : styles.iconsinactive}>
            <MaterialIcons name="local-movies" size={24} color='white'  />
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => {catSetter("TV")}} >
          <View style={category === "TV" ? styles.iconactive : styles.iconsinactive}>
            <Feather name="tv" size={24} color='white'  />
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => {catSetter("Music")}} >
          <View style={category === "Music" ? styles.iconactive : styles.iconsinactive}>
            <Feather name="music" size={24} color='white'  />
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => {catSetter("Book")}} >
          <View style={category === "Book" ? styles.iconactive : styles.iconsinactive}>
            <Feather name="book" size={24} color='white'  />
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => {catSetter("Manga")}} >
          <View style={category === "Manga" ? styles.iconactive : styles.iconsinactive}>
            <Image style={styles.imgselected} source={require('../../assets/mangawhite.png' )} />
           
          </View>
        </TouchableWithoutFeedback >
        <TouchableWithoutFeedback onPress={() => {catSetter("Anime")}}>
          <View style={category === "Anime" ? styles.iconactive : styles.iconsinactive}>
            <Image style={styles.anime} source={require('../../assets/animewhite.png')} />
          </View>
        </TouchableWithoutFeedback>
      </View>
      <TextInput onChangeText={(text) => {
        setText(text)
        if(text.length > 0) {
          predictor(text)
          
        }
        
        
        }}
                 placeholder={category === '' ? "Select a category" : category}
                 style={category === '' ? styles.inputdisabled : styles.input}
                 value={text}
                 editable={category !== ''}
                  selectionColor='tomato' />


        <View style={styles.autol}>
          
          {data.map(({name, year, img}) => ( 
            <Pressable key={`${name}-${year}`}
                        style={styles.autoi}
                        onPress={() => {setText(name)}}>

               <Image 
                style={styles.imgInList}
                source={{uri: img}}
               />      
      
     
              <View style={styles.ltext}>
              
              <Text style={styles.mname}>{name}</Text>
              <Text style={styles.yeartxt}>Released: {year}</Text>
              </View>
      
            </Pressable>
            

          ))}
        </View>

       
                  
      
      
      
      

       
    </View>
  )
}



const styles = StyleSheet.create({
    categories: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    yeartxt:{
      fontSize: 10,
      paddingTop: 5,
      color: 'tomato'
    },
    imgInList: {
      width: 40,
       height: 60,
       borderTopLeftRadius: 10,
       borderBottomLeftRadius: 10

    },
    mname: {
      
    },
    ltext: {
      padding: 10
    },
    input: {
        borderColor: "tomato",
        borderRadius: 10,
        borderWidth: 1,
        height: 48,
        marginTop: 20,
        padding: 8,
        backgroundColor: 'white'
      },
      autol: {
        
        
      },
      autoi: {
        backgroundColor: 'white',
        paddingRight: 10,
        borderWidth: 1,
        borderColor: 'tomato',
        borderRadius: 10,
        flexDirection: 'row',
        marginTop: 5

      },
      headers: {
        margin: 10,
        fontSize: 24,
        color: 'white'
      },
      inputdisabled: {
        borderColor: "gray",
        borderRadius: 10,
        borderWidth: 1,
        height: 48,
        marginTop: 20,
        marginBottom: 20,
        padding: 8,
        backgroundColor: '#c4c4c4'
      },
    inv: {
        
        display: 'none'
     },
     imgselected: {
        width: 24,
        height: 24,
     },
    anime: {
        width: 32,
        height: 24
    },
    iconsinactive: {
        padding: 10,
        margin: 5,
        alignItems: 'center',
        width: 60,
        borderColor: 'white',
        borderRadius: 30,
        borderWidth: 1,
    },
    iconactive: {
        padding: 10,
        margin: 5,
        alignItems: 'center',
        width: 60,
        borderColor: 'white',
        borderRadius: 30,
        borderWidth: 1,
        backgroundColor: 'tomato'
    },
    maincontainer: {
        padding: 10,
        flex: 1,
        backgroundColor: '#54038a',
    },
    btn: {
      alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: 'tomato',
    },
    btntext: {
      fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
    }
    
  });
