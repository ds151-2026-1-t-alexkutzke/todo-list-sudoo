import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';

export default function ListadeTarefas() {
  const [tarefa, setTarefa] = useState('');

  const [lista, setLista] = useState<any[]>([]);

  function adicionarTarefa() {
    if (tarefa.trim() === '') {
      Alert.alert('Ops', 'Você precisa digitar alguma coisa!');
      return;
    }

    const novaTarefa = {
      id: Math.random().toString(),
      texto: tarefa,
      concluida: false
    };

    setLista([novaTarefa, ...lista]);
    setTarefa('');
  }

  function marcarConcluida(id: string) {
    const novaLista = lista.map(item => {
      if (item.id === id) {
        return { ...item, concluida: !item.concluida };
      }
      return item;
    });
    setLista(novaLista);
  }

  function removerTarefa(id: string) {
    const novaLista = lista.filter(item => item.id !== id);
    setLista(novaLista);
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputArea}>
        <TextInput
          style={styles.input}
          placeholder="Adicione uma nova tarefa..."
          value={tarefa}
          onChangeText={setTarefa}
          onSubmitEditing={adicionarTarefa}
        />
      </View>

      {lista.length === 0 ? (
        <View style={styles.vazio}>
          <Text style={styles.vazioTexto}>Nenhuma tarefa adicionada</Text>
          <Text style={styles.vazioSub}>Comece adicionando uma nova tarefa acima</Text>
        </View>
      ) : (
        <FlatList
          data={lista}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <TouchableOpacity 
                style={styles.check} 
                onPress={() => marcarConcluida(item.id)}
              >
                <View style={[styles.circulo, item.concluida && styles.checkAtivo]}>
                  {item.concluida && <Text style={styles.checkTexto}>✓</Text>}
                </View>
              </TouchableOpacity>

              <Text style={[styles.textoItem, item.concluida && styles.textoRiscado]}>
                {item.texto}
              </Text>

              <TouchableOpacity onPress={() => removerTarefa(item.id)}>
                <Text style={styles.remover}>✕</Text>
              </TouchableOpacity>
            </View>
          )}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  inputArea: {
    backgroundColor: '#FFF',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  input: {
    backgroundColor: '#F9F9F9',
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#DDD',
    fontSize: 16,
  },
  item: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginHorizontal: 15,
    marginTop: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#EEE',
  },
  check: {
    marginRight: 15,
  },
  circulo: {
    width: 25,
    height: 25,
    borderRadius: 13,
    borderWidth: 2,
    borderColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkAtivo: {
    backgroundColor: '#007AFF',
  },
  checkTexto: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  textoItem: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  textoRiscado: {
    textDecorationLine: 'line-through',
    color: '#AAA',
  },
  remover: {
    color: '#FF3B30',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  vazio: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  vazioTexto: {
    fontSize: 18,
    color: '#999',
    fontWeight: 'bold',
  },
  vazioSub: {
    fontSize: 14,
    color: '#BBB',
    textAlign: 'center',
    marginTop: 5,
  }
});
