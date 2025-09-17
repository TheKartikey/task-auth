
import { encrypt } from '../../utils/crypto.js';
import StudentModel from './student.model.js';




export const createStudent = async (req, res) => {
  try {
    const {
      fullName,
      email,
      phoneNumber,
      dateOfBirth,
      gender,
      address,
      courseEnrolled,
      password
    } = req.body;

   
    const encryptedStudent = {
      fullName: encrypt(fullName),
      email: encrypt(email),
      phoneNumber: encrypt(phoneNumber || ''),
      dateOfBirth: encrypt(dateOfBirth || ''),
      gender: encrypt(gender || ''),
      address: encrypt(address || ''),
      courseEnrolled: encrypt(courseEnrolled || ''),
      password: encrypt(password)
    };

    const student = new StudentModel(encryptedStudent);
    await student.save();

    res.status(201).json({ message: 'Student created successfully', id: student._id });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ error: 'Email already exists' });
    } else {
      console.error('Error creating student:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

export const getStudents = async (req, res) => {
  try {
    const students = await StudentModel.find().select('-password');
    

    const partiallyDecryptedStudents = students.map(student => ({
      _id: student._id,
      fullName: student.fullName,
      email: student.email,
      phoneNumber: student.phoneNumber,
      dateOfBirth: student.dateOfBirth,
      gender: student.gender,
      address: student.address,
      courseEnrolled: student.courseEnrolled,
      createdAt: student.createdAt,
      updatedAt: student.updatedAt
    }));

    res.json(partiallyDecryptedStudents);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Encrypt updated fields with second level encryption
    const encryptedUpdates = {};
    if (updates.fullName) encryptedUpdates.fullName = encrypt(updates.fullName);
    if (updates.email) encryptedUpdates.email = encrypt(updates.email);
    if (updates.phoneNumber) encryptedUpdates.phoneNumber = encrypt(updates.phoneNumber);
    if (updates.dateOfBirth) encryptedUpdates.dateOfBirth = encrypt(updates.dateOfBirth);
    if (updates.gender) encryptedUpdates.gender = encrypt(updates.gender);
    if (updates.address) encryptedUpdates.address = encrypt(updates.address);
    if (updates.courseEnrolled) encryptedUpdates.courseEnrolled = encrypt(updates.courseEnrolled);
    if (updates.password) encryptedUpdates.password = encrypt(updates.password);

    const student = await StudentModel.findByIdAndUpdate(id, encryptedUpdates, { new: true });
    
    if (!student) {
      res.status(404).json({ error: 'Student not found' });
      return;
    }

    res.json({ message: 'Student updated successfully' });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ error: 'Email already exists' });
    } else {
      console.error('Error updating student:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

export const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await StudentModel.findByIdAndDelete(id);
    
    if (!student) {
      res.status(404).json({ error: 'Student not found' });
      return;
    }

    res.json({ message: 'Student deleted successfully' });
  } catch (error) {
    console.error('Error deleting student:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

