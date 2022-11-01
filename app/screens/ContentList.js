import { View, Text } from 'react-native'
import React from 'react'
import * as SQLite from "expo-sqlite";
import { useState, useEffect } from "react";

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

export default function ContentList() {
    const [items, setItems] = useState(null);

    useEffect(() => {
        db.transaction((tx) => {
            tx.executeSql(
                `select * from content;`, [], (_, {rows: { _array  } }) => setItems(_array)
            );
        });
    }, []);
    if(items === null) {
        return (
            <View>
                <Text>LOL</Text>
            </View>
        )
    }


  return (
    <View>
        {items.map(({id, title}) => (
            <Text key={id}>{title}</Text>
        ))}
      
    </View>
  )
}