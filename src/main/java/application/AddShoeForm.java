package application;

import javax.swing.*;
import java.awt.*;

public class AddShoeForm extends JFrame{
    private JPanel MainPanel;
    private JButton confirmButton;
    private JPanel TopPanel;
    private JPanel NamePanel;
    private JPanel SizePanel;
    private JPanel YearPanel;
    private JPanel ButtonPanel;
    private JTextField textField1;
    private JTextField textField2;
    private JTextField textField3;
    private JFrame jFrame;

    public AddShoeForm(){

        if (!GraphicsEnvironment.isHeadless()) {
            //Setup
            jFrame = new JFrame();
            jFrame.setContentPane(MainPanel);
            jFrame.pack();
            jFrame.setSize(400,400);
            jFrame.setLocationRelativeTo(null);
            jFrame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
            jFrame.setVisible(true);
        } else {
            System.err.println("Cannot create UI in headless enviroment.");
        }

    }
}
