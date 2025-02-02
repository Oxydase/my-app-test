import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { useState, useEffect } from 'react';

const MAX_NUMBER = 50;
const EASY_TIME = 45;
const HARD_TIME = 20;

const rndNumber = () => {
  return Math.floor(Math.random() * MAX_NUMBER);
};

const formatTime = (time) => {
  return time < 10 ? `00 : 0${time}` : `00 : ${time}`;
};

export default function App() {
  const [difficulty, setDifficulty] = useState('easy');
  const [numberOne, setNumberOne] = useState(rndNumber());
  const [numberTwo, setNumberTwo] = useState(rndNumber());
  const [numberThree, setNumberThree] = useState(rndNumber());
  const [solution, setSolution] = useState();
  const [userAnswer, setUserAnswer] = useState(0);
  const [msg, setMsg] = useState('');
  const [timeLeft, setTimeLeft] = useState(EASY_TIME);
  const [btnEnabled, setBtnEnabled] = useState(true);

  useEffect(() => {
    if (difficulty === 'easy') {
      setSolution(numberOne + numberTwo);
    } else {
      setSolution(numberOne + numberTwo + numberThree);
    }
  }, [numberOne, numberTwo, numberThree, difficulty]);

  useEffect(() => {
    const timer = setInterval(decreaseTime, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      setBtnEnabled(false);
      setMsg(`Temps écoulé, la bonne réponse était ${solution}`);
    }
  }, [timeLeft]);

  const decreaseTime = () => {
    setTimeLeft((timeLeft) => Math.max(timeLeft - 1, 0));
  };

  const handleSubmit = () => {
    if (parseInt(userAnswer) === solution) {
      setMsg('Bonne réponse');
    } else {
      setMsg(`Mauvaise réponse, la réponse était ${solution}`);
    }
  };

  const handleDifficultyChange = (level) => {
    setDifficulty(level);
    setNumberOne(rndNumber());
    setNumberTwo(rndNumber());
    setNumberThree(rndNumber());
    setTimeLeft(level === 'easy' ? EASY_TIME : HARD_TIME);
    setBtnEnabled(true);
    setMsg('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button title="Facile" onPress={() => handleDifficultyChange('easy')} />
        <Button title="Difficile" onPress={() => handleDifficultyChange('hard')} />
      </View>
      <Text>{formatTime(timeLeft)}</Text>
      <Text>
        {numberOne} + {numberTwo}
        {difficulty === 'hard' && ` + ${numberThree}`} =
      </Text>
      <TextInput
        placeholder="Entrez votre réponse"
        keyboardType="numeric"
        onChangeText={setUserAnswer}
      />
      <Button title="Additionner" onPress={handleSubmit} disabled={!btnEnabled} />
      <Text>{msg}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    marginBottom: 20,
  },
});
