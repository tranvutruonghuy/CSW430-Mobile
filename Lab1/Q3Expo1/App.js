import React, { useState } from "react";
import { Text, Button, View } from "react-native";

export default () => {
    const [pressCount, setPressCount] = useState(0);

    return (
        <View style={{ alignItems: "center", marginTop: 50 }}>
            <Text>Trần Vũ Trường Huy</Text>
            <Text>You've pressed the button: {pressCount} time(s)</Text>
            <Button
                title="Press me"
                onPress={() => setPressCount(pressCount + 1)}
            />
        </View>
    );
};
