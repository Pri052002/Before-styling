import React, { useState } from 'react';
import axios from 'axios';

const CreateCourse = () => {
  const [newCourse, setNewCourse] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    price: 0,
    modules: [], // Array to hold module objects
  });

  const [newModule, setNewModule] = useState({
    title: '',
    content: '',
    order: 0,
  });

  const handleCourseSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5033/api/Courses", newCourse);
      alert('Course created successfully!');
      setNewCourse({ title: '', description: '', startDate: '', endDate: '', price: 0, modules: [] }); // Reset form
    } catch (error) {
      console.error('Error creating course:', error);
      alert('Error creating course. Please check your input.');
    }
  };

  const handleModuleSubmit = (e) => {
    e.preventDefault();
    // Validate the module before adding it
    if (!newModule.title || !newModule.content || newModule.order <= 0) {
      alert('Please fill in all module fields correctly.');
      return;
    }

    setNewCourse((prev) => ({
      ...prev,
      modules: [...prev.modules, { ...newModule, courseId: 0 }] // courseId is set later in the backend
    }));
    
    // Reset new module form
    setNewModule({ title: '', content: '', order: 0 });
  };

  return (
    <div>
      <h2>Create New Course</h2>
      <form onSubmit={handleCourseSubmit}>
        <input
          type="text"
          placeholder="Course Title"
          value={newCourse.title}
          onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
          required
        />
        <textarea
          placeholder="Course Description"
          value={newCourse.description}
          onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
          required
        />
        <input
          type="date"
          value={newCourse.startDate}
          onChange={(e) => setNewCourse({ ...newCourse, startDate: e.target.value })}
          required
        />
        <input
          type="date"
          value={newCourse.endDate}
          onChange={(e) => setNewCourse({ ...newCourse, endDate: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Course Price"
          value={newCourse.price}
          onChange={(e) => setNewCourse({ ...newCourse, price: parseFloat(e.target.value) })}
          required
        />

        {/* Module Creation */}
        <h3>Add Module</h3>
        <input
          type="text"
          placeholder="Module Title"
          value={newModule.title}
          onChange={(e) => setNewModule({ ...newModule, title: e.target.value })}
          required
        />
        <textarea
          placeholder="Module Content"
          value={newModule.content}
          onChange={(e) => setNewModule({ ...newModule, content: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Module Order"
          value={newModule.order}
          onChange={(e) => setNewModule({ ...newModule, order: parseInt(e.target.value) })}
          required
        />
        <button onClick={handleModuleSubmit}>Add Module</button>

        <button type="submit">Create Course</button>
      </form>
      <h4>Modules:</h4>
      <ul>
        {newCourse.modules.map((module, index) => (
          <li key={index}>{module.title} (Order: {module.order})</li>
        ))}
      </ul>
    </div>
  );
};

export default CreateCourse;
