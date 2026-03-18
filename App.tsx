import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import ListadeTarefas from './src/components/ListadeTarefas';

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <ListadeTarefas />
        <StatusBar style="dark" />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
